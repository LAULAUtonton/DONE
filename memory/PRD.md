# Global Issues: Making a Difference - PRD

## Project Overview
Online journal/survey system for 3rd ESO students creating podcast or video log projects about global issues.

## Original Problem Statement
Create an online journal project for podcast/video log students project for 3rd ESO (3 students per group). Survey-style forms that guide students through a structured 6-day workflow to complete their project script.

## User Personas
1. **Students (3rd ESO, 14-15 years)**: Work in groups of 3, complete daily forms to build their podcast/video script
2. **Teacher**: Views all group submissions, monitors progress, grades using rubric

## Core Requirements (Static)
- 6-day structured workflow (Planning → Research → Language → Draft Script → Final Script & Production → Reflection)
- Group-based work (1 device per group)
- Choice between Radio Podcast or Video Log project type
- Teacher dashboard with password protection and grading system
- Progress tracking for each group
- Interface in English

## What's Been Implemented ✅
**Date: January 2026**

### Backend (FastAPI + MongoDB)
- Group CRUD operations with project type support
- **6-day data storage** (day1-day6 fields)
- Day 1: Topic, why chosen + **3 student guiding questions for research**
- Day 3: Grammar checklist booleans + vocabulary fields
- Day 4: **DRAFT script** + visual sketch + duration
- Day 5: **FINAL corrected script** + rehearsal notes + media link (Drive/YouTube/Vocaroo)
- Day 6: Reflection fields
- **Grading system**: 6 criteria (1-4 scale), automatic totals, teacher comments
- Teacher authentication (password: profesor2024)

### Frontend (React + Tailwind)
- Landing page with "Global Issues: Making a Difference" branding
- Group creation with project type selection (Radio Podcast / Video Log)
- **6-Day Project Workflow**:
  - Day 1: Planning - Teacher questions (topic, why) + **3 student guiding questions for research**
  - Day 2: Research (sources, facts, solutions)
  - Day 3: Language with **Unit 3 Grammar Checklist** (Second Conditional, Indefinite Pronouns)
  - Day 4: **DRAFT Script** with teacher correction warning
  - Day 5: **FINAL Corrected Script** + Rehearsal Notes + Recording/Upload (via link)
  - Day 6: **Reflection** (learning, challenges, team, improvements)
- **Teacher Panel**:
  - Shows all groups with progress (X/6) and graded indicator (📝)
  - Day 1 shows student's guiding questions
  - Day 4 labeled as "Draft Script" with 📝 DRAFT label
  - Day 5 labeled as "Final Script & Production" with ✅ FINAL label
  - **GRADING TABLE**: 6 criteria based on rubric (1-4 scale each)
    - Structure, Second Conditional, Indefinite Pronouns, Vocabulary, Pronunciation, Participation
    - Automatic total (sum/24) and percentage
    - Teacher comments field
    - Save Grading button
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
| 1 | Planning | Topic, Why chosen, **3 guiding questions (student creates)** | Topic + why + 3 questions |
| 2 | Research | Sources, 3-4 facts, 3+ solutions | All 3 sections filled |
| 3 | Language | 6 Second Conditionals, 4+ Indefinite Pronouns, Unit 3 Vocab | Sentences + checkboxes |
| 4 | **DRAFT Script** | Complete DRAFT script for all 3 students + ending | Draft script written |
| 5 | **Final Script & Production** | FINAL corrected script, Rehearsal notes, Media link (Drive/YouTube) | All 3 fields completed |
| 6 | Reflection | What learned, Challenges, Teamwork, Experience rating | All questions answered |

## Grading Rubric (Teacher Panel)
| Criteria | 1 (Needs Work) | 2 (Basic) | 3 (Good) | 4 (Excellent) |
|----------|----------------|-----------|----------|---------------|
| Structure | Poor | 1 part missing | Parts included | All parts |
| Second Conditional | Not used | 1-3 with errors | 4-5 correct | 6 correct |
| Indefinite Pronouns | Not used | 1 used | 2-3 used | 4+ used |
| Vocabulary (Unit 3) | Very limited | Limited | Mostly correct | Varied & accurate |
| Pronunciation | Hard to understand | Some difficulty | Mostly clear | Confident |
| Participation | 1 dominates | Unequal | Most speak | All equal |

**Total: /24 points (percentage calculated automatically)**

## Technical Details
- **Backend**: FastAPI on port 8001
- **Frontend**: React on port 3000
- **Database**: MongoDB
- **Teacher Password**: profesor2024
- **Media Upload**: Via links (Google Drive, YouTube, Vocaroo, etc.)

## Prioritized Backlog

### P0 (Critical) - DONE ✅
- [x] Group creation with project type
- [x] 6-day form workflow
- [x] Save progress functionality
- [x] Teacher dashboard with Draft/Final script display
- [x] English interface
- [x] Student guiding questions on Day 1
- [x] Draft script on Day 4 with teacher correction warning
- [x] Final script + rehearsal notes on Day 5
- [x] **Grading table with rubric (1-4 scale, auto totals)**

### P1 (Important) - Future
- [ ] Export to PDF functionality
- [ ] Email notifications when group completes
- [ ] Deadline reminders

### P2 (Nice to Have) - Future
- [ ] Student accounts/login
- [ ] Peer feedback system
- [ ] Direct file upload integration
- [ ] AI-powered script suggestions

## Next Tasks
1. Consider adding PDF export for teacher
2. Add ability to edit group members after creation
3. Consider adding a preview mode before marking day complete
