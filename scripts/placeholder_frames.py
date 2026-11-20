"""Gera quadros provisórios (frente/perfil/costas) para testar o stop motion.
Substituir pelas fotos finais com os mesmos nomes de arquivo."""
import random, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 900, 1200
out = Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
random.seed(7)

def concrete():
    base = Image.new("L", (W // 4, H // 4))
    base.putdata([random.randint(185, 215) for _ in range(base.width * base.height)])
    base = base.resize((W, H), Image.BICUBIC).filter(ImageFilter.GaussianBlur(2))
    return Image.merge("RGB", (base.point(lambda v: v + 3), base, base.point(lambda v: v - 4)))

def font(size):
    for p in ["/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"]:
        try: return ImageFont.truetype(p, size)
        except OSError: pass
    return ImageFont.load_default()

# silhuetas abstratas: casaco com volume nas costas, ombros marcados, calça plissada
shapes = {
  "frente": dict(coat=[(300,300),(600,300),(640,340),(620,720),(280,720),(260,340)], pants=[(320,720),(580,720),(600,1080),(310,1080)]),
  "perfil": dict(coat=[(390,300),(520,300),(640,380),(650,720),(380,720),(370,340)], pants=[(395,720),(560,720),(570,1080),(400,1080)]),
  "costas": dict(coat=[(290,300),(610,300),(670,420),(640,740),(260,740),(230,420)], pants=[(320,740),(580,740),(600,1080),(310,1080)]),
}
for i, (name, s) in enumerate(shapes.items(), 1):
    im = concrete(); d = ImageDraw.Draw(im)
    d.ellipse((415, 180, 485, 270), fill=(120, 118, 114))
    d.polygon(s["pants"], fill=(43, 41, 39))
    d.polygon(s["coat"], fill=(122, 46, 58))
    d.text((W // 2, 1135), f"look 02 — {name} · foto provisória", fill=(43, 41, 39), font=font(26), anchor="mm")
    im.save(out / f"frame-{i:02d}.webp", "WEBP", quality=72, method=6)
print("ok")
