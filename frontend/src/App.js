import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mic, Video, Users, BookOpen, Target, Search, FileText, CheckCircle, Lock, Trash2, Eye, ChevronRight, PenTool, Sparkles, Globe, Play, RefreshCw, CheckSquare } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ============ VOCABULARY ============
const VOCABULARY = ["global issues", "poverty", "inequality", "help", "community", "volunteers", "improve lives"];

// ============ EXAMPLE SCRIPTS ============
const EXAMPLE_SCRIPTS = {
  vlog: `🎤 STUDENT 1 — INTRODUCTION & PROBLEM (40-45 sec)

Hello, we are three students from 3rd of ESO.
Today, we are going to talk about global issues.
There are many problems in the world, like poverty and inequality.
Someone needs help every day.
Something is wrong in many communities.
This happens somewhere in the world all the time.
Everyone should care about these problems.

🎤 STUDENT 2 — SOLUTIONS (35-40 sec)

If someone helped in their community, many lives would improve.
If people cared more, something positive would change.
If everyone worked together, global problems would be smaller.

🎤 STUDENT 3 — SOLUTIONS (35-40 sec)

If governments supported volunteers, they would reduce inequality.
If we lived somewhere safer, people would feel more equal.
If everything was fairer, nobody would be excluded.

🎤 ALL — ENDING (15 sec)

To finish, global issues affect everyone.
If everybody helped, the world would be a better place.
Thank you for watching. Bye!`,

  podcast: `🎤 STUDENT 1 — INTRODUCTION & PROBLEM (40-45 sec)

Hello and welcome to our podcast.
Today we are talking about global issues.
Someone needs help every day.
Something is wrong in many communities.
This happens somewhere in the world.
Everyone should care about these problems.

🎤 STUDENT 2 — SOLUTIONS (35-40 sec)

If someone helped in their community, many lives would improve.
If people cared more, something positive would change.
If everyone worked together, global problems would be smaller.

🎤 STUDENT 3 — SOLUTIONS (35-40 sec)

If governments worked together, they would reduce inequality.
If we lived somewhere safer, nobody would feel excluded.
If everything was fairer, the world would be better.

🎤 ALL — ENDING (15 sec)

To finish, global issues affect everyone.
If everybody helped, the world would be a better place.
Thank you for listening!`
};

// ============ LANDING PAGE ============
const Landing = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", members: ["", "", ""], projectType: "podcast" });
  const [error, setError] = useState("");

  useEffect(() => { fetchGroups(); }, []);

  const fetchGroups = async () => {
    try { const res = await axios.get(`${API}/groups`); setGroups(res.data); } catch (e) { console.error(e); }
  };

  const createGroup = async () => {
    if (!newGroup.name.trim()) { setError("Please enter a group name"); return; }
    const validMembers = newGroup.members.filter(m => m.trim());
    if (validMembers.length < 1) { setError("Add at least one member"); return; }
    try {
      const res = await axios.post(`${API}/groups`, { group_name: newGroup.name, members: validMembers, project_type: newGroup.projectType });
      navigate(`/project/${res.data.id}`);
    } catch (e) { setError(e.response?.data?.detail || "Error creating group"); }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8" data-testid="landing-page">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(139,92,246,1)] mb-6">
            <Globe className="w-8 h-8" />
            <span className="font-bold text-xl uppercase tracking-wider">Unit 3</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-black mb-4" style={{fontFamily: 'Outfit, sans-serif'}}>
            Global Issues:<br/>Making a Difference
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">Synchronize 3 · 3º ESO · A2 Level</p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <button onClick={() => setShowCreate(true)} className="bg-[#A3E635] text-black border-2 border-black hover:bg-[#84cc16] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase tracking-wide py-4 px-8 flex items-center justify-center gap-2" data-testid="create-group-btn">
            <Users className="w-5 h-5" /> New Group
          </button>
          <button onClick={() => navigate('/teacher')} className="bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase tracking-wide py-4 px-8 flex items-center justify-center gap-2" data-testid="teacher-btn">
            <Lock className="w-5 h-5" /> Teacher Panel
          </button>
        </div>

        {showCreate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" data-testid="create-group-modal">
            <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2"><Sparkles className="w-6 h-6 text-[#8B5CF6]" /> New Group</h2>
              {error && <div className="bg-red-100 border-2 border-red-500 p-3 mb-4 text-red-700 font-medium">{error}</div>}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold uppercase tracking-widest block mb-2">Group Name</label>
                  <input type="text" value={newGroup.name} onChange={(e) => setNewGroup({...newGroup, name: e.target.value})} className="w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" placeholder="E.g.: EcoWave" data-testid="group-name-input" />
                </div>
                <div>
                  <label className="text-sm font-bold uppercase tracking-widest block mb-2">Project Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setNewGroup({...newGroup, projectType: 'podcast'})} className={`p-4 border-2 border-black flex flex-col items-center gap-2 ${newGroup.projectType === 'podcast' ? 'bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]' : 'bg-white hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`} data-testid="type-podcast-btn">
                      <Mic className="w-8 h-8" /><span className="font-bold text-sm">Podcast</span><span className="text-xs opacity-75">2:00-2:30</span>
                    </button>
                    <button type="button" onClick={() => setNewGroup({...newGroup, projectType: 'vlog'})} className={`p-4 border-2 border-black flex flex-col items-center gap-2 ${newGroup.projectType === 'vlog' ? 'bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]' : 'bg-white hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`} data-testid="type-vlog-btn">
                      <Video className="w-8 h-8" /><span className="font-bold text-sm">Video Log</span><span className="text-xs opacity-75">2:00-2:30</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold uppercase tracking-widest block mb-2">3 Students</label>
                  {newGroup.members.map((m, i) => (
                    <input key={i} type="text" value={m} onChange={(e) => { const members = [...newGroup.members]; members[i] = e.target.value; setNewGroup({...newGroup, members}); }} className="w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-2" placeholder={`Student ${i + 1}`} data-testid={`member-input-${i}`} />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => {setShowCreate(false); setError("");}} className="flex-1 bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase py-3" data-testid="cancel-create-btn">Cancel</button>
                <button onClick={createGroup} className="flex-1 bg-black text-white border-2 border-black hover:bg-[#8B5CF6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase py-3" data-testid="confirm-create-btn">Create</button>
              </div>
            </div>
          </div>
        )}

        {groups.length > 0 && (
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5" /> Continue Project</h2>
            <div className="grid gap-4">
              {groups.map(g => {
                const completed = [g.day1?.completed, g.day2?.completed, g.day3?.completed, g.day4?.completed, g.day5?.completed, g.day6?.completed].filter(Boolean).length;
                const isPodcast = g.project_type === 'podcast' || !g.project_type;
                return (
                  <button key={g.id} onClick={() => navigate(`/project/${g.id}`)} className="w-full bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all text-left flex items-center justify-between" data-testid={`group-card-${g.id}`}>
                    <div className="flex items-center gap-3">
                      {isPodcast ? <Mic className="w-5 h-5 text-[#8B5CF6]" /> : <Video className="w-5 h-5 text-[#F472B6]" />}
                      <div><h3 className="font-bold text-lg">{g.group_name}</h3><p className="text-gray-600 text-sm">{g.members?.join(", ")}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-[#A3E635] border-2 border-black px-3 py-1 font-bold text-sm">{completed}/6</div>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============ CHECKBOX ============
const Checkbox = ({ checked, onChange, label }) => (
  <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-gray-50 border-2 border-black mb-2 bg-white">
    <button type="button" onClick={() => onChange(!checked)} className={`w-6 h-6 border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5 ${checked ? 'bg-[#A3E635]' : 'bg-white'}`}>
      {checked && <CheckSquare className="w-5 h-5" />}
    </button>
    <span className="text-sm">{label}</span>
  </label>
);

// ============ PROJECT PAGE ============
const ProjectPage = () => {
  const navigate = useNavigate();
  const groupId = window.location.pathname.split('/').pop();
  const [group, setGroup] = useState(null);
  const [activeDay, setActiveDay] = useState(1);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetchGroup(); }, [groupId]);

  const fetchGroup = async () => {
    try {
      const res = await axios.get(`${API}/groups/${groupId}`);
      setGroup(res.data);
      const days = [res.data.day1, res.data.day2, res.data.day3, res.data.day4, res.data.day5, res.data.day6];
      const firstIncomplete = days.findIndex(d => !d?.completed);
      setActiveDay(firstIncomplete === -1 ? 6 : firstIncomplete + 1);
    } catch (e) { navigate('/'); }
  };

  const updateDay = (day, field, value) => {
    setGroup(prev => ({ ...prev, [`day${day}`]: { ...prev[`day${day}`], [field]: value } }));
    setSaved(false);
  };

  const saveDay = async (day) => {
    setSaving(true);
    try { await axios.put(`${API}/groups/${groupId}/day`, { day, data: group[`day${day}`] }); setSaved(true); setTimeout(() => setSaved(false), 2000); } catch (e) { console.error(e); }
    setSaving(false);
  };

  const markComplete = async (day) => {
    const dayData = {...group[`day${day}`], completed: true};
    setSaving(true);
    try { await axios.put(`${API}/groups/${groupId}/day`, { day, data: dayData }); setGroup(prev => ({ ...prev, [`day${day}`]: dayData })); if (day < 6) setActiveDay(day + 1); } catch (e) { console.error(e); }
    setSaving(false);
  };

  if (!group) return <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center"><div className="animate-pulse text-xl font-bold">Loading...</div></div>;

  const isPodcast = group.project_type === 'podcast' || !group.project_type;
  const exampleScript = isPodcast ? EXAMPLE_SCRIPTS.podcast : EXAMPLE_SCRIPTS.vlog;

  const days = [
    { num: 1, title: "Planning", icon: Target, color: "#8B5CF6" },
    { num: 2, title: "Research", icon: Search, color: "#F472B6" },
    { num: 3, title: "Language", icon: BookOpen, color: "#06B6D4" },
    { num: 4, title: "Script", icon: PenTool, color: "#F59E0B" },
    { num: 5, title: "Production", icon: Play, color: "#10B981" },
    { num: 6, title: "Reflection", icon: RefreshCw, color: "#A3E635" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]" data-testid="project-page">
      <header className="bg-black text-white p-4 border-b-4 border-[#A3E635]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:text-[#A3E635]">
            <Globe className="w-6 h-6" /><span className="font-bold uppercase tracking-wider hidden md:inline">Unit 3</span>
          </button>
          <div className="text-center">
            <h1 className="font-bold text-lg flex items-center justify-center gap-2">
              {isPodcast ? <Mic className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              {group.group_name}
            </h1>
            <p className="text-sm text-gray-400">{group.members?.join(" • ")} | {isPodcast ? 'Podcast' : 'Video Log'} (2:00-2:30)</p>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Navigation */}
          <div className="md:col-span-3">
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <h2 className="font-bold uppercase tracking-widest text-sm mb-4">Steps</h2>
              <div className="space-y-2">
                {days.map(d => {
                  const isComplete = group[`day${d.num}`]?.completed;
                  const isActive = activeDay === d.num;
                  return (
                    <button key={d.num} onClick={() => setActiveDay(d.num)} className={`w-full text-left p-3 border-2 border-black flex items-center gap-3 transition-all ${isActive ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]' : isComplete ? 'bg-[#A3E635]' : 'bg-white hover:bg-gray-100'}`} data-testid={`day-${d.num}-btn`}>
                      {isComplete ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <d.icon className="w-5 h-5 flex-shrink-0" style={{color: isActive ? 'white' : d.color}} />}
                      <div><div className="font-bold text-sm">Day {d.num}</div><div className="text-xs opacity-75">{d.title}</div></div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="md:col-span-9">
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              
              {/* DAY 1 - Planning */}
              {activeDay === 1 && (
                <div data-testid="day-1-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2"><Target className="w-6 h-6 text-[#8B5CF6]" /> Day 1: Planning</h2>
                  
                  {/* TURN IN BOX */}
                  <div className="bg-red-100 border-4 border-red-500 p-4 mb-6">
                    <h3 className="font-bold text-lg uppercase mb-2">📥 TO COMPLETE DAY 1, YOU MUST:</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2"><span className={`w-5 h-5 border-2 border-black flex items-center justify-center ${group.day1?.topic ? 'bg-green-400' : 'bg-white'}`}>{group.day1?.topic && '✓'}</span> Write your <strong>topic</strong></li>
                      <li className="flex items-center gap-2"><span className={`w-5 h-5 border-2 border-black flex items-center justify-center ${group.day1?.why_this_topic ? 'bg-green-400' : 'bg-white'}`}>{group.day1?.why_this_topic && '✓'}</span> Explain the <strong>problem</strong> (what + who)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm mb-2">🌍 Choose ONE Global Issue:</h3>
                    <div className="flex flex-wrap gap-2">
                      {["poverty", "inequality", "pollution", "climate change", "homelessness", "racism"].map(issue => (
                        <span key={issue} className="bg-white border border-black px-3 py-1 text-sm font-medium">{issue}</span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🎯 Your Topic <span className="text-red-500">*</span></label>
                      <input type="text" value={group.day1?.topic || ""} onChange={(e) => updateDay(1, 'topic', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" placeholder="e.g., poverty, inequality, pollution..." data-testid="day1-topic" />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📍 What is the problem? Who does it affect? <span className="text-red-500">*</span></label>
                      <textarea value={group.day1?.why_this_topic || ""} onChange={(e) => updateDay(1, 'why_this_topic', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]" placeholder="Example: Poverty affects many people around the world. Someone needs help every day." data-testid="day1-why" />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 2 - Research */}
              {activeDay === 2 && (
                <div data-testid="day-2-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2"><Search className="w-6 h-6 text-[#F472B6]" /> Day 2: Research</h2>
                  
                  {/* TURN IN BOX */}
                  <div className="bg-red-100 border-4 border-red-500 p-4 mb-6">
                    <h3 className="font-bold text-lg uppercase mb-2">📥 TO COMPLETE DAY 2, YOU MUST:</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2"><span className={`w-5 h-5 border-2 border-black flex items-center justify-center ${group.day2?.sources ? 'bg-green-400' : 'bg-white'}`}>{group.day2?.sources && '✓'}</span> List your <strong>sources</strong></li>
                      <li className="flex items-center gap-2"><span className={`w-5 h-5 border-2 border-black flex items-center justify-center ${group.day2?.learnings ? 'bg-green-400' : 'bg-white'}`}>{group.day2?.learnings && '✓'}</span> Write <strong>3-4 facts</strong></li>
                      <li className="flex items-center gap-2"><span className={`w-5 h-5 border-2 border-black flex items-center justify-center ${group.day2?.target_audience ? 'bg-green-400' : 'bg-white'}`}>{group.day2?.target_audience && '✓'}</span> Write <strong>3 solutions</strong></li>
                    </ul>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔍 Sources (where did you find information?) <span className="text-red-500">*</span></label>
                      <textarea value={group.day2?.sources || ""} onChange={(e) => updateDay(2, 'sources', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]" placeholder="List websites, videos, articles..." data-testid="day2-sources" />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📊 Facts about your topic (3-4 simple facts) <span className="text-red-500">*</span></label>
                      <textarea value={group.day2?.learnings || ""} onChange={(e) => updateDay(2, 'learnings', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[120px]" placeholder="Fact 1:&#10;Fact 2:&#10;Fact 3:" data-testid="day2-learnings" />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">💡 Solutions (at least 3) <span className="text-red-500">*</span></label>
                      <textarea value={group.day2?.target_audience || ""} onChange={(e) => updateDay(2, 'target_audience', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]" placeholder="Solution 1:&#10;Solution 2:&#10;Solution 3:" data-testid="day2-solutions" />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 3 - Language */}
              {activeDay === 3 && (
                <div data-testid="day-3-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2"><BookOpen className="w-6 h-6 text-[#06B6D4]" /> Day 3: Language</h2>
                  
                  {/* TURN IN BOX */}
                  <div className="bg-red-100 border-4 border-red-500 p-4 mb-6">
                    <h3 className="font-bold text-lg uppercase mb-2">📥 TO COMPLETE DAY 3, YOU MUST:</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2"><span className={`w-5 h-5 border-2 border-black flex items-center justify-center ${group.day3?.introduction ? 'bg-green-400' : 'bg-white'}`}>{group.day3?.introduction && '✓'}</span> Write <strong>6 Second Conditional sentences</strong></li>
                      <li className="flex items-center gap-2"><span className={`w-5 h-5 border-2 border-black flex items-center justify-center ${group.day3?.development ? 'bg-green-400' : 'bg-white'}`}>{group.day3?.development && '✓'}</span> Write sentences with <strong>4+ Indefinite Pronouns</strong></li>
                      <li className="flex items-center gap-2"><span className={`w-5 h-5 border-2 border-black flex items-center justify-center ${group.day3?.grammar_second_conditional ? 'bg-green-400' : 'bg-white'}`}>{group.day3?.grammar_second_conditional && '✓'}</span> Check the <strong>conditionals checkbox</strong></li>
                      <li className="flex items-center gap-2"><span className={`w-5 h-5 border-2 border-black flex items-center justify-center ${group.day3?.grammar_indefinite_pronouns ? 'bg-green-400' : 'bg-white'}`}>{group.day3?.grammar_indefinite_pronouns && '✓'}</span> Check the <strong>pronouns checkbox</strong></li>
                    </ul>
                  </div>
                  
                  {/* GRAMMAR REQUIREMENTS - CLEAR BOX */}
                  <div className="bg-red-100 border-4 border-red-500 p-4 mb-6">
                    <h3 className="font-bold text-lg uppercase mb-3 text-red-700">⚠️ YOU MUST USE:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white border-2 border-black p-4">
                        <h4 className="font-bold text-lg mb-2">🔵 6 SECOND CONDITIONAL</h4>
                        <p className="text-sm mb-2"><strong>Form:</strong> If + past simple, <strong>would</strong> + verb</p>
                        <div className="bg-yellow-50 p-2 text-sm space-y-1">
                          <p>✓ If people <strong>helped</strong> more, the world <strong>would be</strong> better.</p>
                          <p>✓ If governments <strong>worked</strong> together, they <strong>would reduce</strong> problems.</p>
                          <p>✓ If everyone <strong>cared</strong>, something <strong>would change</strong>.</p>
                        </div>
                      </div>
                      <div className="bg-white border-2 border-black p-4">
                        <h4 className="font-bold text-lg mb-2">🟣 4+ INDEFINITE PRONOUNS</h4>
                        <div className="text-sm space-y-2">
                          <p><strong>People:</strong> <span className="bg-purple-100 px-1">someone</span> · <span className="bg-purple-100 px-1">everyone</span> · <span className="bg-purple-100 px-1">nobody</span></p>
                          <p><strong>Things:</strong> <span className="bg-purple-100 px-1">something</span> · <span className="bg-purple-100 px-1">everything</span> · <span className="bg-purple-100 px-1">nothing</span></p>
                          <p><strong>Places:</strong> <span className="bg-purple-100 px-1">somewhere</span> · <span className="bg-purple-100 px-1">everywhere</span> · <span className="bg-purple-100 px-1">nowhere</span></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* VOCABULARY */}
                  <div className="bg-green-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-2">📖 UNIT 3 VOCABULARY - Use these words!</h3>
                    <div className="flex flex-wrap gap-2">
                      {VOCABULARY.map(w => (<span key={w} className="bg-white border border-black px-3 py-1 text-sm font-medium">{w}</span>))}
                    </div>
                  </div>

                  {/* EASY TEMPLATES */}
                  <div className="bg-blue-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-2">📝 COPY THESE SENTENCES:</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-bold mb-1">Second Conditional:</p>
                        <p className="bg-white p-2 border border-gray-300 mb-1">"If someone <strong>helped</strong> in their community, many lives <strong>would improve</strong>."</p>
                        <p className="bg-white p-2 border border-gray-300 mb-1">"If people <strong>cared</strong> more, something positive <strong>would change</strong>."</p>
                        <p className="bg-white p-2 border border-gray-300">"If everyone <strong>worked</strong> together, global problems <strong>would be</strong> smaller."</p>
                      </div>
                      <div>
                        <p className="font-bold mb-1">Indefinite Pronouns:</p>
                        <p className="bg-white p-2 border border-gray-300 mb-1">"<strong>Someone</strong> needs help every day."</p>
                        <p className="bg-white p-2 border border-gray-300 mb-1">"<strong>Something</strong> is wrong in many communities."</p>
                        <p className="bg-white p-2 border border-gray-300 mb-1">"<strong>Everyone</strong> should care about these problems."</p>
                        <p className="bg-white p-2 border border-gray-300">"If <strong>nobody</strong> helps, <strong>nothing</strong> will change."</p>
                      </div>
                    </div>
                  </div>

                  {/* CHECKLIST */}
                  <div className="bg-yellow-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-3">✅ CHECKLIST - Mark when done:</h3>
                    <Checkbox checked={group.day3?.grammar_second_conditional || false} onChange={(v) => updateDay(3, 'grammar_second_conditional', v)} label={<span><strong>I wrote 6 Second Conditional sentences</strong> (If + past, would + verb)</span>} />
                    <Checkbox checked={group.day3?.grammar_indefinite_pronouns || false} onChange={(v) => updateDay(3, 'grammar_indefinite_pronouns', v)} label={<span><strong>I used 4+ Indefinite Pronouns</strong> (someone, everyone, something, nothing...)</span>} />
                    <Checkbox checked={group.day3?.grammar_compound_nouns || false} onChange={(v) => updateDay(3, 'grammar_compound_nouns', v)} label={<span><strong>I used Unit 3 vocabulary</strong></span>} />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📝 Write your 6 SECOND CONDITIONAL sentences here:</label>
                      <textarea value={group.day3?.introduction || ""} onChange={(e) => updateDay(3, 'introduction', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[150px]" placeholder="1. If someone helped..., ... would improve.&#10;2. If people cared..., ... would change.&#10;3. If everyone worked..., ... would be...&#10;4. If governments supported..., ... would reduce...&#10;5. If we lived..., ... would feel...&#10;6. If everybody helped..., ... would be..." data-testid="day3-conditionals" />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📝 Write sentences with INDEFINITE PRONOUNS (4+):</label>
                      <textarea value={group.day3?.development || ""} onChange={(e) => updateDay(3, 'development', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[120px]" placeholder="Someone needs help every day.&#10;Something is wrong in many communities.&#10;Everyone should care about these problems.&#10;If nobody helps, nothing will change." data-testid="day3-pronouns" />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 4 - Script */}
              {activeDay === 4 && (
                <div data-testid="day-4-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2"><PenTool className="w-6 h-6 text-[#F59E0B]" /> Day 4: Script</h2>
                  
                  {/* STRUCTURE */}
                  <div className="bg-purple-100 border-4 border-purple-500 p-4 mb-6">
                    <h3 className="font-bold text-lg uppercase mb-3">{isPodcast ? '🎙️ PODCAST' : '🎬 VIDEO LOG'} STRUCTURE</h3>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white border-2 border-black p-3">
                        <strong>🔹 STUDENT 1 (40-45 sec):</strong> Introduction + Problem
                        <p className="text-gray-600 mt-1">Greeting, names, global issue, who it affects</p>
                      </div>
                      <div className="bg-white border-2 border-black p-3">
                        <strong>🔹 STUDENT 2 (35-40 sec):</strong> Solutions with Second Conditional
                        <p className="text-gray-600 mt-1">3 solutions using "If..., would..."</p>
                      </div>
                      <div className="bg-white border-2 border-black p-3">
                        <strong>🔹 STUDENT 3 (35-40 sec):</strong> More Solutions with Second Conditional
                        <p className="text-gray-600 mt-1">3 more solutions using "If..., would..."</p>
                      </div>
                      <div className="bg-white border-2 border-black p-3">
                        <strong>🔹 ALL STUDENTS (15 sec):</strong> Ending
                        <p className="text-gray-600 mt-1">Final idea + Goodbye</p>
                      </div>
                    </div>
                  </div>

                  {/* REQUIREMENTS CHECKLIST */}
                  <div className="bg-red-100 border-4 border-red-500 p-4 mb-6">
                    <h3 className="font-bold text-lg uppercase mb-2">⚠️ YOUR SCRIPT MUST HAVE:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div className="bg-white border-2 border-black p-2 text-center"><div className="font-bold text-2xl">6</div>Second Conditional</div>
                      <div className="bg-white border-2 border-black p-2 text-center"><div className="font-bold text-2xl">4+</div>Indefinite Pronouns</div>
                      <div className="bg-white border-2 border-black p-2 text-center"><div className="font-bold text-2xl">2:00</div>Minimum time</div>
                      <div className="bg-white border-2 border-black p-2 text-center"><div className="font-bold text-2xl">3</div>Students speak</div>
                    </div>
                  </div>

                  {/* EXAMPLE SCRIPT */}
                  <div className="bg-green-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-2">✅ EXAMPLE SCRIPT (copy this format!):</h3>
                    <div className="bg-white border border-gray-300 p-3 max-h-72 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-xs font-mono">{exampleScript}</pre>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📄 YOUR COMPLETE SCRIPT</label>
                      <textarea value={group.day4?.draft_script || ""} onChange={(e) => updateDay(4, 'draft_script', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[400px] font-mono text-sm" placeholder={`🎤 STUDENT 1 — INTRODUCTION & PROBLEM (40-45 sec)\n\nHello, we are three students from 3rd of ESO.\nToday, we are going to talk about [YOUR TOPIC].\n[Add facts and indefinite pronouns here]\n\n🎤 STUDENT 2 — SOLUTIONS (35-40 sec)\n\nIf someone helped..., ... would improve.\nIf people cared..., ... would change.\nIf everyone worked..., ... would be smaller.\n\n🎤 STUDENT 3 — SOLUTIONS (35-40 sec)\n\nIf governments supported..., ... would reduce...\nIf we lived..., ... would feel...\nIf everything was..., ... would be...\n\n🎤 ALL — ENDING (15 sec)\n\nTo finish, global issues affect everyone.\nIf everybody helped, the world would be a better place.\nThank you for ${isPodcast ? 'listening' : 'watching'}!`} data-testid="day4-script" />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 5 - Production */}
              {activeDay === 5 && (
                <div data-testid="day-5-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2"><Play className="w-6 h-6 text-[#10B981]" /> Day 5: Production</h2>
                  
                  {/* RUBRIC */}
                  <div className="bg-blue-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-2">📋 ASSESSMENT RUBRIC - How you will be graded:</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-black text-white">
                            <th className="border border-black p-2 text-left">Criteria</th>
                            <th className="border border-black p-2">Excellent (4)</th>
                            <th className="border border-black p-2">Good (3)</th>
                            <th className="border border-black p-2">Basic (2)</th>
                            <th className="border border-black p-2">Needs Work (1)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="border border-black p-2 font-bold">Structure</td><td className="border border-black p-2 bg-green-100">All parts included</td><td className="border border-black p-2">Parts included</td><td className="border border-black p-2">1 part missing</td><td className="border border-black p-2">Poor structure</td></tr>
                          <tr><td className="border border-black p-2 font-bold">Second Conditional</td><td className="border border-black p-2 bg-green-100">6 correct sentences</td><td className="border border-black p-2">4-5 correct</td><td className="border border-black p-2">1-3 with errors</td><td className="border border-black p-2">Not used</td></tr>
                          <tr><td className="border border-black p-2 font-bold">Indefinite Pronouns</td><td className="border border-black p-2 bg-green-100">4+ used correctly</td><td className="border border-black p-2">2-3 used</td><td className="border border-black p-2">1 used</td><td className="border border-black p-2">Not used</td></tr>
                          <tr><td className="border border-black p-2 font-bold">Vocabulary (Unit 3)</td><td className="border border-black p-2 bg-green-100">Accurate and varied</td><td className="border border-black p-2">Mostly correct</td><td className="border border-black p-2">Limited</td><td className="border border-black p-2">Very limited</td></tr>
                          <tr><td className="border border-black p-2 font-bold">Pronunciation</td><td className="border border-black p-2 bg-green-100">Confident, fluent</td><td className="border border-black p-2">Mostly clear</td><td className="border border-black p-2">Some difficulty</td><td className="border border-black p-2">Hard to understand</td></tr>
                          <tr><td className="border border-black p-2 font-bold">Participation</td><td className="border border-black p-2 bg-green-100">All students speak equally</td><td className="border border-black p-2">Most speak</td><td className="border border-black p-2">Unequal</td><td className="border border-black p-2">1 student dominates</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-green-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-2">🎤🎥 FREE TOOLS:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-bold text-sm mb-2">📻 PODCAST (Audio):</p>
                        <div className="space-y-2">
                          <a href="https://vocaroo.com" target="_blank" rel="noopener noreferrer" className="block bg-white border border-black p-2 hover:bg-yellow-50 transition-colors">
                            <span className="font-bold">Vocaroo</span>
                            <span className="text-xs text-blue-600 ml-2">vocaroo.com →</span>
                          </a>
                          <a href="https://online-voice-recorder.com" target="_blank" rel="noopener noreferrer" className="block bg-white border border-black p-2 hover:bg-yellow-50 transition-colors">
                            <span className="font-bold">Online Voice Recorder</span>
                            <span className="text-xs text-blue-600 ml-2">online-voice-recorder.com →</span>
                          </a>
                          <a href="https://podcasters.spotify.com" target="_blank" rel="noopener noreferrer" className="block bg-white border border-black p-2 hover:bg-yellow-50 transition-colors">
                            <span className="font-bold">Spotify for Podcasters</span>
                            <span className="text-xs text-blue-600 ml-2">podcasters.spotify.com →</span>
                          </a>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-sm mb-2">🎬 VIDEO LOG:</p>
                        <div className="space-y-2">
                          <a href="https://info.flip.com" target="_blank" rel="noopener noreferrer" className="block bg-white border border-black p-2 hover:bg-yellow-50 transition-colors">
                            <span className="font-bold">Flip</span>
                            <span className="text-xs text-blue-600 ml-2">info.flip.com →</span>
                          </a>
                          <a href="https://www.clipchamp.com" target="_blank" rel="noopener noreferrer" className="block bg-white border border-black p-2 hover:bg-yellow-50 transition-colors">
                            <span className="font-bold">Clipchamp</span>
                            <span className="text-xs text-blue-600 ml-2">clipchamp.com →</span>
                          </a>
                          <div className="bg-white border border-black p-2">
                            <span className="font-bold">📱 Device Camera</span>
                            <span className="text-xs text-gray-600 ml-2">Use your phone/tablet</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🎭 Rehearsal Notes</label>
                      <textarea value={group.day5?.rehearsal_notes || ""} onChange={(e) => updateDay(5, 'rehearsal_notes', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]" placeholder="How many times did you practice?" data-testid="day5-rehearsal" />
                    </div>
                    <div className="bg-[#A3E635] border-2 border-black p-4">
                      <h3 className="font-bold text-sm uppercase mb-2">🎉 SUBMIT YOUR {isPodcast ? 'PODCAST' : 'VIDEO LOG'}!</h3>
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔗 Link (YouTube, Google Drive...)</label>
                      <input type="url" value={group.day5?.media_link || ""} onChange={(e) => updateDay(5, 'media_link', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" placeholder="https://..." data-testid="day5-link" />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 6 - Reflection */}
              {activeDay === 6 && (
                <div data-testid="day-6-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2"><RefreshCw className="w-6 h-6 text-[#A3E635]" /> Day 6: Reflection</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📚 What did you learn?</label>
                      <textarea value={group.day6?.what_learned || ""} onChange={(e) => updateDay(6, 'what_learned', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]" placeholder="About the topic? About English?" data-testid="day6-learned" />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">⚡ What was difficult?</label>
                      <textarea value={group.day6?.challenges_faced || ""} onChange={(e) => updateDay(6, 'challenges_faced', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]" placeholder="What challenges did you face?" data-testid="day6-challenges" />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">👥 How did you work as a team?</label>
                      <textarea value={group.day6?.team_collaboration || ""} onChange={(e) => updateDay(6, 'team_collaboration', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]" placeholder="Who did what?" data-testid="day6-team" />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">⭐ Rate your experience (1-10)</label>
                      <textarea value={group.day6?.overall_experience || ""} onChange={(e) => updateDay(6, 'overall_experience', e.target.value)} className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]" placeholder="1-10 and why..." data-testid="day6-experience" />
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col md:flex-row gap-3 mt-8 pt-6 border-t-2 border-black">
                <button onClick={() => saveDay(activeDay)} disabled={saving} className="flex-1 bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase py-3 flex items-center justify-center gap-2 disabled:opacity-50" data-testid="save-btn">
                  <FileText className="w-5 h-5" /> {saving ? "Saving..." : saved ? "Saved!" : "Save"}
                </button>
                <button onClick={() => markComplete(activeDay)} disabled={saving} className="flex-1 bg-[#A3E635] text-black border-2 border-black hover:bg-[#84cc16] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase py-3 flex items-center justify-center gap-2 disabled:opacity-50" data-testid="complete-btn">
                  <CheckCircle className="w-5 h-5" /> Complete Day {activeDay}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ TEACHER DASHBOARD ============
const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const login = async () => { try { await axios.post(`${API}/teacher/login`, { password }); setAuthenticated(true); fetchGroups(); } catch (e) { setError("Incorrect password"); } };
  const fetchGroups = async () => { try { const res = await axios.get(`${API}/groups`); setGroups(res.data); } catch (e) { console.error(e); } };
  const deleteGroup = async (id) => { if (!window.confirm("Delete?")) return; try { await axios.delete(`${API}/groups/${id}`); setGroups(groups.filter(g => g.id !== id)); if (selectedGroup?.id === id) setSelectedGroup(null); } catch (e) {} };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4" data-testid="teacher-login">
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2"><Lock className="w-6 h-6" /> Teacher Panel</h1>
          {error && <div className="bg-red-100 border-2 border-red-500 p-3 mb-4 text-red-700">{error}</div>}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && login()} className="w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4" placeholder="Password" data-testid="teacher-password" />
          <button onClick={login} className="w-full bg-black text-white border-2 border-black hover:bg-[#8B5CF6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase py-3" data-testid="teacher-login-btn">Enter</button>
          <button onClick={() => navigate('/')} className="w-full mt-3 text-gray-600 hover:text-black">← Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]" data-testid="teacher-dashboard">
      <header className="bg-black text-white p-4 border-b-4 border-[#8B5CF6]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2"><Lock className="w-6 h-6" /><span className="font-bold uppercase">Teacher Panel</span></div>
          <button onClick={() => navigate('/')} className="hover:text-[#A3E635]">← Exit</button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <h2 className="font-bold uppercase text-sm mb-4">Groups ({groups.length})</h2>
              {groups.length === 0 ? <p className="text-gray-500 text-sm">No groups</p> : (
                <div className="space-y-2">
                  {groups.map(g => {
                    const completed = [g.day1?.completed, g.day2?.completed, g.day3?.completed, g.day4?.completed, g.day5?.completed, g.day6?.completed].filter(Boolean).length;
                    return (
                      <div key={g.id} className={`border-2 border-black p-3 cursor-pointer ${selectedGroup?.id === g.id ? 'bg-[#8B5CF6] text-white' : 'bg-white hover:bg-gray-100'}`} onClick={() => setSelectedGroup(g)} data-testid={`teacher-group-${g.id}`}>
                        <div className="flex justify-between items-start">
                          <div><h3 className="font-bold">{g.group_name}</h3><p className="text-xs opacity-75">{g.members?.join(", ")}</p></div>
                          <div className={`px-2 py-1 text-xs font-bold border-2 ${selectedGroup?.id === g.id ? 'border-white' : 'border-black bg-[#A3E635]'}`}>{completed}/6</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-2">
            {selectedGroup ? (
              <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-black">
                  <div><h2 className="text-2xl font-bold">{selectedGroup.group_name}</h2><p className="text-gray-600">{selectedGroup.members?.join(" • ")}</p></div>
                  <button onClick={() => deleteGroup(selectedGroup.id)} className="bg-red-500 text-white border-2 border-black p-2" data-testid="delete-group-btn"><Trash2 className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                  {[1,2,3,4,5,6].map(day => {
                    const d = selectedGroup[`day${day}`];
                    const titles = ["Planning","Research","Language","Script","Production","Reflection"];
                    return (
                      <div key={day} className={`border-2 border-black p-4 ${d?.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {d?.completed ? <CheckCircle className="w-5 h-5 text-green-600" /> : <div className="w-5 h-5 border-2 border-black rounded-full" />}
                          <h3 className="font-bold">Day {day}: {titles[day-1]}</h3>
                        </div>
                        {day === 1 && d && <div className="text-sm"><p><strong>Topic:</strong> {d.topic || "-"}</p><p><strong>Problem:</strong> {d.why_this_topic || "-"}</p></div>}
                        {day === 2 && d && <div className="text-sm"><p><strong>Facts:</strong> {d.learnings || "-"}</p><p><strong>Solutions:</strong> {d.target_audience || "-"}</p></div>}
                        {day === 3 && d && <div className="text-sm"><p><strong>Conditionals:</strong> {d.introduction || "-"}</p><p><strong>Pronouns:</strong> {d.development || "-"}</p></div>}
                        {day === 4 && d && <div className="text-sm"><pre className="bg-white border p-2 whitespace-pre-wrap text-xs max-h-40 overflow-y-auto">{d.draft_script || "-"}</pre></div>}
                        {day === 5 && d && <div className="text-sm">{d.media_link && <p><strong>Link:</strong> <a href={d.media_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{d.media_link}</a></p>}</div>}
                        {day === 6 && d && <div className="text-sm"><p><strong>Learned:</strong> {d.what_learned || "-"}</p><p><strong>Experience:</strong> {d.overall_experience || "-"}</p></div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-12 text-center"><Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" /><p className="text-gray-500">Select a group</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App" style={{fontFamily: 'Manrope, sans-serif'}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
