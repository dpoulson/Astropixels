#!/usr/bin/env python3
import os

DOCS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs"))
OUTPUT_JS = os.path.join(os.path.dirname(__file__), "docs_context.js")

def gather_docs():
    sections = []
    for root, _, files in sorted(os.walk(DOCS_DIR)):
        for file in sorted(files):
            if file.endswith(".md"):
                rel_path = os.path.relpath(os.path.join(root, file), DOCS_DIR)
                with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                    content = f.read().strip()
                sections.append(f"=== FILE: {rel_path} ===\n{content}\n")
    return "\n".join(sections)

def main():
    combined = gather_docs()
    # Escape backticks and ${}
    safe_content = combined.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write("export const DOCS_CONTEXT = `")
        f.write(safe_content)
        f.write("`;\n")
    print(f"Generated {OUTPUT_JS} ({len(safe_content)} chars)")

if __name__ == "__main__":
    main()
