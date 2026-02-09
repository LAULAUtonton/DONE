# Global Issues: Making a Difference - PRD

## Project Overview
Online journal/survey system for 3rd ESO students creating podcast or video log projects about global issues.

## Original Problem Statement
Create an online journal project for podcast/video log students project for 3rd ESO (3 students per group). Survey-style forms that guide students through a structured 6-day workflow to complete their project script.

## User Personas
1. **Students (3rd ESO, 14-15 years)**: Work in groups of 3, complete daily forms to build their podcast/video script
2. **Teacher**: Views all group submissions, monitors progress, can delete groups

## Core Requirements (Static)
- 6-day structured workflow (Planning → Research → Language → Draft Script → Final Script & Production → Reflection)
- Group-based work (1 device per group)
- Choice between Radio Podcast or Video Log project type
- Teacher dashboard with password protection
- Progress tracking for each group
- Interface in English

## What's Been Implemented ✅
**Date: January 2026**

### Backend (FastAPI + MongoDB)
- Group CRUD operations with project type support
- **6-day data storage** (day1-day6 fields)
- Day 1: Topic, problem/who it affects, importance (3 guiding questions)
- Day 3: Grammar checklist booleans + vocabulary fields
- Day 4: **DRAFT script** + visual sketch + duration
- Day 5: **FINAL corrected script** + rehearsal notes + media link
- Day 6: Reflection fields
- Teacher authentication (password: profesor2024)
- All error messages in English

### Frontend (React + Tailwind)
- Landing page with "Global Issues: Making a Difference" branding
- Group creation with project type selection (Radio Podcast / Video Log)
- **6-Day Project Workflow**:
  - Day 1: Planning - **3 Guiding Questions** (topic, problem/who it affects, why important)
  - Day 2: Research (sources, facts, solutions)
  - Day 3: Language with **Unit 3 Grammar Checklist** (Second Conditional, Indefinite Pronouns)
  - Day 4: **DRAFT Script** with teacher correction warning
  - Day 5: **FINAL Corrected Script** + Rehearsal Notes + Recording/Upload
  - Day 6: **Reflection** (learning, challenges, team, improvements)
- **Teacher Panel**:
  - Shows all groups with progress (X/6)
  - Day 4 labeled as "Draft Script" with 📝 DRAFT label
  - Day 5 labeled as "Final Script & Production" with ✅ FINAL label
  - Shows draft_script, final_script, rehearsal_notes, and media_link
- Progress indicators (X/6)
- Turn-in requirements checklist for each day

### Design
- Neo-brutalist style (2px black borders, hard shadows)
- Color palette: Lime green (#A3E635), Violet (#8B5CF6), Pink (#F472B6)
- Fonts: Outfit (headings), Manrope (body)
- Mobile-responsive

## Day Workflow Structure (6 Days)
| Day | Title | Fields | Turn-in Requirements |
|-----|-------|--------|---------------------|
| 1 | Planning | Topic, Problem/Who affected, Why important | 3 guiding questions answered |
| 2 | Research | Sources, 3-4 facts, 3+ solutions | All 3 sections filled |
| 3 | Language | 6 Second Conditionals, 4+ Indefinite Pronouns, Unit 3 Vocab | Sentences + checkboxes |
| 4 | **DRAFT Script** | Complete DRAFT script for all 3 students + ending | Draft script written |
| 5 | **Final Script & Production** | FINAL corrected script, Rehearsal notes, Media link | All 3 fields completed |
| 6 | Reflection | What learned, Challenges, Teamwork, Experience rating | All questions answered |

## Technical Details
- **Backend**: FastAPI on port 8001
- **Frontend**: React on port 3000
- **Database**: MongoDB
- **Teacher Password**: profesor2024

## Prioritized Backlog

### P0 (Critical) - DONE ✅
- [x] Group creation with project type
- [x] 6-day form workflow
- [x] Save progress functionality
- [x] Teacher dashboard with Draft/Final script display
- [x] English interface
- [x] 3 guiding questions on Day 1
- [x] Draft script on Day 4 with teacher correction warning
- [x] Final script + rehearsal notes on Day 5

### P1 (Important) - Future
- [ ] Export to PDF functionality
- [ ] Email notifications when group completes
- [ ] Deadline reminders

### P2 (Nice to Have) - Future
- [ ] Student accounts/login
- [ ] Peer feedback system
- [ ] Audio/video upload integration (Google Drive)
- [ ] AI-powered script suggestions

## Next Tasks
1. Consider adding Google Drive integration for media uploads
2. Consider adding PDF export for teacher
3. Add ability to edit group members after creation
4. Consider adding a preview mode before marking day complete
