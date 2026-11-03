# RedHat Training

<p align="center"><a href="https://spencer-cdw.github.io/redhat-training/">Open the Flashcard Terminal</a></p>

Collection of notes from the RedHat Training courses.

## RHCSA 9

- [RH124](./rhcsa/rh124/)
- [RH134](./rhcsa/rh134/)

## Ansible

- [DO374](./ansible/do374/)

## Flashcards

A dependency-free static flashcard site lives in the repository root. Choose a
training path with the left/right arrow keys, then press Enter. OpenShift offers
DO156-4.18 and DO280-v4.22. DO280 questions live in
[`openshift/do280-v4.22/flashcards.yaml`](./openshift/do280-v4.22/flashcards.yaml)
and are shuffled when a study session starts. AAP and DO156 are placeholders
until their decks are added.

Cards use either `terminal` (type a command and press Enter) or `multi_select`
(use the arrow keys and Space to select, then Enter to check). Optional hints
appear below the answer controls and are revealed with the arrow keys and
Space. Incorrect answers can be retried; after three misses, a “Show answer”
button becomes available. The repository
[`flashcard-author` skill](./.github/skills/flashcard-author/SKILL.md) drafts
additional questions from course notes into a reviewable file; it never
automatically changes the published deck.

Build and validate the YAML deck, then serve the generated static site locally:

```sh
ruby scripts/build_site.rb
python3 -m http.server 8000 --directory _site
```

Then open <http://localhost:8000>. GitHub Actions runs the same build and deploys
the generated site to GitHub Pages. Use the repository's `flashcard-author`
skill to draft additional questions from course notes into a reviewable
`flashcards.draft.yaml`; review drafts before adding them to the curated deck.
