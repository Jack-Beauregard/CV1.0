# Portfólió Weboldal

## Telepítés

1. Flask telepítése:
```
pip install -r requirements.txt
```

## Indítás

Futtasd a `run_server.bat` fájlt, vagy:
```
python app.py
```

Nyisd meg a böngészőt: `http://localhost:8000`

## Jelszó

Alapértelmezett jelszó: `admin123`

A jelszót a `config.py` vagy `app.py` fájlban tudod megváltoztatni.

## Struktúra

```
SW/
├── app.py                  # Flask alkalmazás
├── config.py              # Beállítások
├── requirements.txt       # Python függőségek
├── run_server.bat         # Szerver indító
├── templates/             # HTML sablonok
├── static/                # CSS, JS, képek
└── content/               # Oldal tartalmak
```

## Témák

- **Sötét mód**: Cyberpunk stílus (neon kék, pink)
- **Világos mód**: Éteri stílus (pasztell kék, türkiz)

A téma automatikusan felismeri a rendszer beállítást, vagy manuálisan váltható a jobb felső sarokban.

## Jellemzők

✅ Jelszavas védelem session kezeléssel
✅ Hamburger menü bal oldalt, középen
✅ 6 menüpont (ETC, LEARN, WORKX, HOBBY, PO, LAN)
✅ Reszponzív design
✅ Sötét/Világos téma váltás
✅ Üveg effektek, animációk
