#!/usr/bin/env python3
"""Lightweight structural validator for the Handwrite Agent Skill repository."""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SKILL_DIR = ROOT / "skills" / "handwrite-assignment"
SKILL_FILE = SKILL_DIR / "SKILL.md"

REQUIRED_FILES = [
    ROOT / "README.md",
    ROOT / "LICENSE",
    ROOT / "CONTRIBUTING.md",
    ROOT / "SECURITY.md",
    SKILL_FILE,
    SKILL_DIR / "references" / "page-planning.md",
    SKILL_DIR / "references" / "handwriting-style.md",
    SKILL_DIR / "references" / "image-rendering.md",
    SKILL_DIR / "references" / "quality-checklist.md",
    SKILL_DIR / "assets" / "page-brief-template.md",
    ROOT / "evals" / "cases.yaml",
]

errors = []

for path in REQUIRED_FILES:
    if not path.is_file():
        errors.append(f"Missing required file: {path.relative_to(ROOT)}")

if SKILL_FILE.is_file():
    content = SKILL_FILE.read_text(encoding="utf-8")
    if not content.startswith("---\n"):
        errors.append("SKILL.md must begin with YAML frontmatter.")
    else:
        parts = content.split("---", 2)
        if len(parts) < 3:
            errors.append("SKILL.md frontmatter is not closed.")
        else:
            frontmatter = parts[1]
            name_match = re.search(r"(?m)^name:\s*([a-z0-9-]+)\s*$", frontmatter)
            desc_match = re.search(r"(?m)^description:\s*(.+)$", frontmatter)
            if not name_match:
                errors.append("Frontmatter requires a valid lowercase name.")
            elif name_match.group(1) != SKILL_DIR.name:
                errors.append("Frontmatter name must match the skill directory name.")
            if not desc_match:
                errors.append("Frontmatter requires a description.")
            elif len(desc_match.group(1)) > 1024:
                errors.append("Frontmatter description exceeds 1024 characters.")
    line_count = len(content.splitlines())
    if line_count > 500:
        errors.append(f"SKILL.md has {line_count} lines; keep core instructions under 500.")

# Ensure every relative reference linked by the core skill resolves.
if SKILL_FILE.is_file():
    content = SKILL_FILE.read_text(encoding="utf-8")
    for rel in re.findall(r"\]\(([^)]+)\)", content):
        if rel.startswith(("http://", "https://", "#", "mailto:")):
            continue
        target = (SKILL_DIR / rel).resolve()
        if not target.exists():
            errors.append(f"Broken SKILL.md reference: {rel}")

if errors:
    print("VALIDATION FAILED")
    for error in errors:
        print(f" - {error}")
    sys.exit(1)

print("VALIDATION PASSED")
print(f"Skill: {SKILL_DIR.relative_to(ROOT)}")
print(f"Core instructions: {len(SKILL_FILE.read_text(encoding='utf-8').splitlines())} lines")
print(f"Required files checked: {len(REQUIRED_FILES)}")
