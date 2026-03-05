from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from backend.models import Info
from backend.database import get_session
from pydantic import BaseModel
import os, requests
from typing import List
from openai import OpenAI
import spotipy 

router = APIRouter()

class RepoInput(BaseModel):
    repo_url: str
    song_languages: list[str]

@router.post("/analyze", response_model=Info)
async def analyze_repo(input: RepoInput session: Session = Depends(get_session)):
repo_url = input.repo_url
song_languages = input.song_languages
repo_url = input.repo_url
 owner, repo = repo_url.rstrip('/').split('/')[-2:]
branch = 'main'
api_url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1"
resp = requests.get(api_url)
if resp.status_code != 200:
    raise HTTPException(
        status_code=400,
        detail=f"Repo file listing failed: {resp.text}")

tree = resp.json().get("tree", [])
    file_paths = [
        f['path'] for f in tree
        if f['type'] == 'blob'
           and not f['path'].lower().endswith((
               '.png','.jpg','.jpeg','.gif','.svg','.zip','.ico','.exe','.dll'
           ))
    ]

    big_text = ""      
    max_chars = 100_000  
    for path in file_paths:
        raw_url = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}"
        file_resp = requests.get(raw_url)
        if file_resp.status_code != 200:
            continue    
        content = file_resp.text
       
        big_text += f"\n--- FILE: {path} ---\n{content}\n"
        if len(big_text) > max_chars:
            break       

    if not big_text:
        raise HTTPException(status_code=400, detail="Could not fetch any repo files/text.")

   
    prompt = (
        "Analyze all the project files below (code, README, docs, styles, etc).\n"
        "1. Give a 2-3 sentence summary of the project.\n"
        "2. Then list 3-5 genres, 3-5 moods, and 5-10 keywords suitable for a Spotify playlist themed to this repo.\n"
        f"Favor these languages if possible: {', '.join(input.song_languages)}.\n"
        "Format like this:\n"
        "Summary: ...\nGenres: ...\nMoods: ...\nKeywords: ...\n"
        f"\n--- PROJECT FILES BEGIN ---\n{big_text}\n--- PROJECT FILES END ---\n"
    )

    
    ai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    chat_response = ai_client.chat.completions.create(
        model="gpt-4o", 
        messages=[{"role": "user", "content": prompt}]
    )
    ai_text = chat_response.choices[0].message.content
   
    summary = genres = moods = keywords = ""
    lines = ai_text.strip().splitlines()
    section = None
    for line in lines:
        if line.lower().startswith("summary:"):
            section = "summary"
            summary = line.partition(":")[2].strip()
        elif line.lower().startswith("genres:"):
            section = "genres"
            genres = line.partition(":")[2].strip()
        elif line.lower().startswith("moods:"):
            section = "moods"
            moods = line.partition(":")[2].strip()
        elif line.lower().startswith("keywords:"):
            section = "keywords"
            keywords = line.partition(":")[2].strip()
        elif section == "summary":
            summary += " " + line.strip()
        elif section == "genres":
            genres += " " + line.strip()
        elif section == "moods":
            moods += " " + line.strip()
        elif section == "keywords":
            keywords += " " + line.strip()

    try:
        sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
            client_id=os.getenv("f4df45f5d99e46b19857a7e323880301"),
            client_secret=os.getenv("38736ceb3fb84ac5bbfe976c45dcd3f1"),
            redirect_uri=os.getenv("http://127.0.0.1:8000/callback"),
            scope="playlist-modify-public"
        ))
        user_id = sp.me()['id']
        search_query = f"{genres} {moods} {keywords} {' '.join(input.song_languages)}"
        results = sp.search(q=search_query, type="track", limit=12)
        track_ids = [track["id"] for track in results["tracks"]["items"]]
        playlist = sp.user_playlist_create(
            user=user_id,
            name="curates by synth.fm",
            public=True,
            description= "for you, from synth.fm <3 love, arya"
        )
        if track_ids:
            sp.playlist_add_items(playlist_id=playlist["id"], items=track_ids)
        playlist_url = playlist["external_urls"]["spotify"]
    except Exception as e:
        playlist_url = ""
        summary += f"\n(Playlist error: {e})"


    info = Info(
        repo_url=input.repo_url,
        summary=summary,
        genres=genres,
        moods=moods,
        keywords=keywords,
        playlist_url=playlist_url
    )
    session.add(info)Playlist
    session.commit()
    session.refresh(info)
    return info