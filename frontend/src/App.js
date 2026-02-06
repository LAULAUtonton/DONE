import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mic, Video, Users, BookOpen, Target, Search, MessageSquare, FileText, CheckCircle, Lock, Trash2, Eye, ChevronRight, PenTool, Sparkles, Globe, Play, RefreshCw, CheckSquare, Square } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ============ UNIT 3 VOCABULARY ============
const UNIT3_VOCABULARY = {
  environment: ["carbon footprint", "climate change", "electric cars", "endangered animals", "fossil fuels", "greenhouse gases", "household rubbish", "plastic packaging", "recycling bins", "solar energy"],
  globalIssues: ["animal rights", "climate change", "gender equality", "homelessness", "pandemic", "pollution", "poverty", "racism"],
  occupations: ["accountant", "architect", "builder", "carpenter", "chef", "journalist", "lawyer", "pharmacist", "pilot", "vet"]
};

// ============ LANDING PAGE ============
const Landing = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", members: ["", "", ""], projectType: "podcast" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${API}/groups`);
      setGroups(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const createGroup = async () => {
    if (!newGroup.name.trim()) {
      setError("Please enter a group name");
      return;
    }
    const validMembers = newGroup.members.filter(m => m.trim());
    if (validMembers.length < 1) {
      setError("Add at least one member");
      return;
    }
    try {
      const res = await axios.post(`${API}/groups`, {
        group_name: newGroup.name,
        members: validMembers,
        project_type: newGroup.projectType
      });
      navigate(`/project/${res.data.id}`);
    } catch (e) {
      setError(e.response?.data?.detail || "Error creating group");
    }
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
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Create your podcast or video log. 6 days, 6 steps. Complete your mission!
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => setShowCreate(true)}
            className="bg-[#A3E635] text-black border-2 border-black hover:bg-[#84cc16] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase tracking-wide py-4 px-8 flex items-center justify-center gap-2 transition-all"
            data-testid="create-group-btn"
          >
            <Users className="w-5 h-5" />
            New Group
          </button>
          <button
            onClick={() => navigate('/teacher')}
            className="bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase tracking-wide py-4 px-8 flex items-center justify-center gap-2 transition-all"
            data-testid="teacher-btn"
          >
            <Lock className="w-5 h-5" />
            Teacher Panel
          </button>
        </div>

        {showCreate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" data-testid="create-group-modal">
            <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#8B5CF6]" />
                New Group
              </h2>
              
              {error && (
                <div className="bg-red-100 border-2 border-red-500 p-3 mb-4 text-red-700 font-medium">{error}</div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold uppercase tracking-widest block mb-2">Group Name</label>
                  <input
                    type="text"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                    className="w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    placeholder="E.g.: The Change Makers"
                    data-testid="group-name-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold uppercase tracking-widest block mb-2">Project Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNewGroup({...newGroup, projectType: 'podcast'})}
                      className={`p-4 border-2 border-black flex flex-col items-center gap-2 transition-all ${
                        newGroup.projectType === 'podcast' 
                          ? 'bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]' 
                          : 'bg-white hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      }`}
                      data-testid="type-podcast-btn"
                    >
                      <Mic className="w-8 h-8" />
                      <span className="font-bold text-sm">Radio Podcast</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewGroup({...newGroup, projectType: 'vlog'})}
                      className={`p-4 border-2 border-black flex flex-col items-center gap-2 transition-all ${
                        newGroup.projectType === 'vlog' 
                          ? 'bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]' 
                          : 'bg-white hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      }`}
                      data-testid="type-vlog-btn"
                    >
                      <Video className="w-8 h-8" />
                      <span className="font-bold text-sm">Video Log</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-bold uppercase tracking-widest block mb-2">Members</label>
                  {newGroup.members.map((m, i) => (
                    <input
                      key={i}
                      type="text"
                      value={m}
                      onChange={(e) => {
                        const members = [...newGroup.members];
                        members[i] = e.target.value;
                        setNewGroup({...newGroup, members});
                      }}
                      className="w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-2"
                      placeholder={`Student ${i + 1}`}
                      data-testid={`member-input-${i}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {setShowCreate(false); setError("");}}
                  className="flex-1 bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase py-3"
                  data-testid="cancel-create-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={createGroup}
                  className="flex-1 bg-black text-white border-2 border-black hover:bg-[#8B5CF6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase py-3"
                  data-testid="confirm-create-btn"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {groups.length > 0 && (
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Continue Project
            </h2>
            <div className="grid gap-4">
              {groups.map(g => {
                const completed = [g.day1?.completed, g.day2?.completed, g.day3?.completed, g.day4?.completed, g.day5?.completed, g.day6?.completed].filter(Boolean).length;
                const isPodcast = g.project_type === 'podcast' || !g.project_type;
                return (
                  <button
                    key={g.id}
                    onClick={() => navigate(`/project/${g.id}`)}
                    className="w-full bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all text-left flex items-center justify-between"
                    data-testid={`group-card-${g.id}`}
                  >
                    <div className="flex items-center gap-3">
                      {isPodcast ? <Mic className="w-5 h-5 text-[#8B5CF6]" /> : <Video className="w-5 h-5 text-[#F472B6]" />}
                      <div>
                        <h3 className="font-bold text-lg">{g.group_name}</h3>
                        <p className="text-gray-600 text-sm">{g.members?.join(", ")}</p>
                      </div>
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

// ============ CHECKBOX COMPONENT ============
const Checkbox = ({ checked, onChange, label }) => (
  <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-gray-50 border-2 border-black mb-2 bg-white">
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-6 h-6 border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5 ${checked ? 'bg-[#A3E635]' : 'bg-white'}`}
    >
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

  useEffect(() => {
    fetchGroup();
  }, [groupId]);

  const fetchGroup = async () => {
    try {
      const res = await axios.get(`${API}/groups/${groupId}`);
      setGroup(res.data);
      const days = [res.data.day1, res.data.day2, res.data.day3, res.data.day4, res.data.day5, res.data.day6];
      const firstIncomplete = days.findIndex(d => !d?.completed);
      setActiveDay(firstIncomplete === -1 ? 6 : firstIncomplete + 1);
    } catch (e) {
      navigate('/');
    }
  };

  const updateDay = (day, field, value) => {
    setGroup(prev => ({
      ...prev,
      [`day${day}`]: { ...prev[`day${day}`], [field]: value }
    }));
    setSaved(false);
  };

  const saveDay = async (day) => {
    setSaving(true);
    try {
      await axios.put(`${API}/groups/${groupId}/day`, { day, data: group[`day${day}`] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const markComplete = async (day) => {
    const dayData = {...group[`day${day}`], completed: true};
    setSaving(true);
    try {
      await axios.put(`${API}/groups/${groupId}/day`, { day, data: dayData });
      setGroup(prev => ({ ...prev, [`day${day}`]: dayData }));
      if (day < 6) setActiveDay(day + 1);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  if (!group) return <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center"><div className="animate-pulse text-xl font-bold">Loading...</div></div>;

  const isPodcast = group.project_type === 'podcast' || !group.project_type;
  const projectLabel = isPodcast ? "Podcast" : "Video Log";

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
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:text-[#A3E635] transition-colors">
            <Globe className="w-6 h-6" />
            <span className="font-bold uppercase tracking-wider hidden md:inline">Unit 3</span>
          </button>
          <div className="text-center">
            <h1 className="font-bold text-lg flex items-center justify-center gap-2">
              {isPodcast ? <Mic className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              {group.group_name}
            </h1>
            <p className="text-sm text-gray-400">{group.members?.join(" • ")}</p>
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
                    <button
                      key={d.num}
                      onClick={() => setActiveDay(d.num)}
                      className={`w-full text-left p-3 border-2 border-black flex items-center gap-3 transition-all ${
                        isActive ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]' :
                        isComplete ? 'bg-[#A3E635]' : 'bg-white hover:bg-gray-100'
                      }`}
                      data-testid={`day-${d.num}-btn`}
                    >
                      {isComplete ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <d.icon className="w-5 h-5 flex-shrink-0" style={{color: isActive ? 'white' : d.color}} />}
                      <div>
                        <div className="font-bold text-sm">Day {d.num}</div>
                        <div className="text-xs opacity-75">{d.title}</div>
                      </div>
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
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6 text-[#8B5CF6]" />
                    Day 1: Planning
                  </h2>
                  
                  <div className="bg-yellow-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm mb-2">📋 CHECKLIST - Complete all fields:</h3>
                    <ul className="text-sm space-y-1">
                      <li>☐ Choose a global issue from Unit 3</li>
                      <li>☐ Explain why this topic is important</li>
                      <li>☐ Define your main message</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm mb-2">🌍 Unit 3 Global Issues - Choose ONE:</h3>
                    <div className="flex flex-wrap gap-2">
                      {UNIT3_VOCABULARY.globalIssues.map(issue => (
                        <span key={issue} className="bg-white border border-black px-2 py-1 text-xs font-medium">{issue}</span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🎯 Your Topic (Global Issue)</label>
                      <input
                        type="text"
                        value={group.day1?.topic || ""}
                        onChange={(e) => updateDay(1, 'topic', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="e.g., Climate change, Pollution, Poverty..."
                        data-testid="day1-topic"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">❓ Why is this topic important?</label>
                      <textarea
                        value={group.day1?.why_this_topic || ""}
                        onChange={(e) => updateDay(1, 'why_this_topic', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="Why should people care about this issue?"
                        data-testid="day1-why"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📢 What is your main message?</label>
                      <textarea
                        value={group.day1?.what_to_communicate || ""}
                        onChange={(e) => updateDay(1, 'what_to_communicate', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="What do you want your audience to learn or do?"
                        data-testid="day1-communicate"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 2 - Research */}
              {activeDay === 2 && (
                <div data-testid="day-2-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <Search className="w-6 h-6 text-[#F472B6]" />
                    Day 2: Research
                  </h2>
                  
                  <div className="bg-yellow-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm mb-2">📋 CHECKLIST:</h3>
                    <ul className="text-sm space-y-1">
                      <li>☐ Find at least 2 reliable sources</li>
                      <li>☐ Write 3-5 important facts</li>
                      <li>☐ Identify your target audience</li>
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔍 Sources (Where did you find information?)</label>
                      <textarea
                        value={group.day2?.sources || ""}
                        onChange={(e) => updateDay(2, 'sources', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="List websites, books, videos you used..."
                        data-testid="day2-sources"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">💡 Key Facts (What did you learn?)</label>
                      <textarea
                        value={group.day2?.learnings || ""}
                        onChange={(e) => updateDay(2, 'learnings', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[120px]"
                        placeholder="Write 3-5 important facts about your topic..."
                        data-testid="day2-learnings"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">👥 Target Audience</label>
                      <textarea
                        value={group.day2?.target_audience || ""}
                        onChange={(e) => updateDay(2, 'target_audience', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="Who will listen/watch? (teenagers, adults, everyone...)"
                        data-testid="day2-audience"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 3 - Language & Structure */}
              {activeDay === 3 && (
                <div data-testid="day-3-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-[#06B6D4]" />
                    Day 3: Language & Structure
                  </h2>
                  
                  {/* Grammar Checklist */}
                  <div className="bg-blue-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-3">📚 UNIT 3 GRAMMAR - Use in your script:</h3>
                    
                    <Checkbox 
                      checked={group.day3?.grammar_second_conditional || false}
                      onChange={(v) => updateDay(3, 'grammar_second_conditional', v)}
                      label={<span><strong>Second Conditional</strong> - "If + past simple, would + verb"<br/><span className="text-xs text-gray-600">Example: "If everyone recycled, we <strong>would</strong> reduce pollution."</span></span>}
                    />
                    <Checkbox 
                      checked={group.day3?.grammar_indefinite_pronouns || false}
                      onChange={(v) => updateDay(3, 'grammar_indefinite_pronouns', v)}
                      label={<span><strong>Indefinite Pronouns</strong> - somebody, everybody, nobody, something, anything, everywhere...<br/><span className="text-xs text-gray-600">Example: "<strong>Everybody</strong> can do <strong>something</strong> to help."</span></span>}
                    />
                    <Checkbox 
                      checked={group.day3?.grammar_compound_nouns || false}
                      onChange={(v) => updateDay(3, 'grammar_compound_nouns', v)}
                      label={<span><strong>Compound Nouns</strong> - carbon footprint, climate change, greenhouse gases...<br/><span className="text-xs text-gray-600">Example: "Our <strong>carbon footprint</strong> affects <strong>climate change</strong>."</span></span>}
                    />
                  </div>

                  {/* Unit 3 Vocabulary */}
                  <div className="bg-green-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-2">📖 UNIT 3 VOCABULARY - Use at least 5 words:</h3>
                    <div className="mb-3">
                      <p className="text-xs font-bold mb-1">Environment:</p>
                      <div className="flex flex-wrap gap-1">
                        {UNIT3_VOCABULARY.environment.map(w => (
                          <span key={w} className="bg-white border border-gray-300 px-2 py-0.5 text-xs">{w}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold mb-1">Global Issues:</p>
                      <div className="flex flex-wrap gap-1">
                        {UNIT3_VOCABULARY.globalIssues.map(w => (
                          <span key={w} className="bg-white border border-gray-300 px-2 py-0.5 text-xs">{w}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📝 Vocabulary you will use (minimum 5 words)</label>
                      <textarea
                        value={group.day3?.key_vocabulary || ""}
                        onChange={(e) => updateDay(3, 'key_vocabulary', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="List the vocabulary words you will use..."
                        data-testid="day3-vocab"
                      />
                    </div>

                    <div className="bg-gray-100 border-2 border-black p-4">
                      <p className="font-bold text-sm">📝 STRUCTURE - Plan your 3 parts:</p>
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">1️⃣ Introduction (30 seconds)</label>
                      <textarea
                        value={group.day3?.introduction || ""}
                        onChange={(e) => updateDay(3, 'introduction', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="How will you start? (greeting, question, fact...)"
                        data-testid="day3-intro"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">2️⃣ Development (2-3 minutes)</label>
                      <textarea
                        value={group.day3?.development || ""}
                        onChange={(e) => updateDay(3, 'development', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="Main points: What is the problem? Facts? Solutions?"
                        data-testid="day3-dev"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">3️⃣ Conclusion (30 seconds)</label>
                      <textarea
                        value={group.day3?.conclusion || ""}
                        onChange={(e) => updateDay(3, 'conclusion', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="Call to action: What should the audience do?"
                        data-testid="day3-conclusion"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 4 - Script */}
              {activeDay === 4 && (
                <div data-testid="day-4-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <PenTool className="w-6 h-6 text-[#F59E0B]" />
                    Day 4: Script
                  </h2>
                  
                  <div className="bg-yellow-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm mb-2">📋 CHECKLIST:</h3>
                    <ul className="text-sm space-y-1">
                      <li>☐ Use the script template below</li>
                      <li>☐ Include Unit 3 grammar (Second Conditional, Indefinite Pronouns)</li>
                      <li>☐ Use at least 5 vocabulary words from Unit 3</li>
                      <li>☐ Total time: 3-4 minutes</li>
                    </ul>
                  </div>

                  {/* COMPLETED SCRIPT EXAMPLE */}
                  <div className="bg-orange-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-2">✅ EXAMPLE SCRIPT (Climate Change - Podcast)</h3>
                    <div className="text-xs font-mono bg-white p-3 border border-gray-300 max-h-64 overflow-y-auto">
                      <pre className="whitespace-pre-wrap">{`[INTRO - 30 sec]
A: Hello everybody! Welcome to "Make a Difference"!
B: Hi! I'm [Name] and today we're talking about climate change.
A: Did you know that if we don't act now, temperatures would rise by 3 degrees?

[PART 1 - The Problem - 1 min]
B: Climate change is everywhere. Greenhouse gases from fossil fuels are causing global warming.
A: If everybody reduced their carbon footprint, we would help the planet.
B: But nobody seems to care enough. Something needs to change!

[PART 2 - The Facts - 1 min]
A: Here are some facts: Electric cars produce zero emissions.
B: Solar energy can power our homes without pollution.
A: If we used recycling bins more, we would reduce household rubbish.

[PART 3 - Solutions - 1 min]
B: So what can we do? Anybody can make a difference!
A: If I were you, I would start by reducing plastic packaging.
B: Everybody can do something: walk more, recycle, save energy.

[OUTRO - 30 sec]
A: Remember: if everybody helped, we would save our planet!
B: Thanks for listening! Do something today!
A: Goodbye!`}</pre>
                    </div>
                  </div>

                  {/* SIMPLE TEMPLATE */}
                  <div className="bg-purple-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-2">📝 YOUR TEMPLATE - Copy and complete:</h3>
                    <div className="text-xs font-mono bg-white p-3 border border-gray-300">
                      <pre className="whitespace-pre-wrap">{isPodcast ? 
`[INTRO - 30 sec]
A: Hello everybody! Welcome to "[Your Podcast Name]"!
B: Hi! I'm [Name] and today we're talking about [TOPIC].
A: [Interesting fact or question about your topic]

[PART 1 - The Problem - 1 min]
B: [Explain the problem - use compound nouns]
A: If [second conditional about the problem]...
B: [More facts about the issue]

[PART 2 - The Facts - 1 min]  
A: [Fact 1 - use vocabulary from Unit 3]
B: [Fact 2]
A: [Fact 3]

[PART 3 - Solutions - 1 min]
B: So what can we do? [Use indefinite pronouns]
A: If I were you, I would [suggestion]...
B: Everybody can [action]. Nobody should [bad action].

[OUTRO - 30 sec]
A: Remember: if everybody helped, we would [positive result]!
B: Thanks for listening! [Call to action]
A: Goodbye!` 
: 
`[SCENE 1 - INTRO - 30 sec]
[Location: classroom/outside]
A: Hello everybody! Welcome to our video about [TOPIC]!
B: I'm [Name]. Today we show you why [topic] matters.

[SCENE 2 - THE PROBLEM - 1 min]
[Show images/graphics about the problem]
A: [Explain the problem - use compound nouns]
B: If we don't change, [second conditional]...

[SCENE 3 - THE FACTS - 1 min]
[Show facts on screen]
A: Fact 1: [use vocabulary]
B: Fact 2: [use vocabulary]
A: Fact 3: [use vocabulary]

[SCENE 4 - SOLUTIONS - 1 min]
[Show examples of solutions]
B: Everybody can do something!
A: If I were you, I would [suggestion]...
B: [More solutions using indefinite pronouns]

[SCENE 5 - OUTRO - 30 sec]
A: Remember: if everybody helped, we would [result]!
B: Thanks for watching! [Call to action]
[End screen]`}</pre>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📄 YOUR SCRIPT (Write here)</label>
                      <textarea
                        value={group.day4?.draft_script || ""}
                        onChange={(e) => updateDay(4, 'draft_script', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[350px] font-mono text-sm"
                        placeholder="Copy the template and write your complete script here..."
                        data-testid="day4-script"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">⏱️ Estimated Duration (3-4 minutes required)</label>
                      <input
                        type="text"
                        value={group.day4?.estimated_duration || ""}
                        onChange={(e) => updateDay(4, 'estimated_duration', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="e.g., 3 minutes 30 seconds"
                        data-testid="day4-duration"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 5 - Production */}
              {activeDay === 5 && (
                <div data-testid="day-5-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <Play className="w-6 h-6 text-[#10B981]" />
                    Day 5: Production & Recording
                  </h2>
                  
                  <div className="bg-yellow-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm mb-2">📋 CHECKLIST:</h3>
                    <ul className="text-sm space-y-1">
                      <li>☐ Practice your script at least 2 times</li>
                      <li>☐ Record your {projectLabel}</li>
                      <li>☐ Check the audio/video quality</li>
                      <li>☐ Upload and share the link</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-2">🛠️ FREE TOOLS:</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-bold mb-1">📻 Podcast:</p>
                        <ul className="text-xs space-y-1">
                          <li>• Phone voice recorder</li>
                          <li>• Audacity (free)</li>
                          <li>• Anchor.fm</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold mb-1">🎬 Video:</p>
                        <ul className="text-xs space-y-1">
                          <li>• Phone camera</li>
                          <li>• CapCut (free)</li>
                          <li>• Canva Video</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🎭 Rehearsal Notes (What did you practice?)</label>
                      <textarea
                        value={group.day5?.rehearsal_notes || ""}
                        onChange={(e) => updateDay(5, 'rehearsal_notes', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="How many times did you practice? What improved?"
                        data-testid="day5-rehearsal"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🛠️ Tools Used</label>
                      <input
                        type="text"
                        value={group.day5?.production_tools || ""}
                        onChange={(e) => updateDay(5, 'production_tools', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="e.g., Phone camera, CapCut..."
                        data-testid="day5-tools"
                      />
                    </div>

                    <div className="bg-[#A3E635] border-2 border-black p-4">
                      <h3 className="font-bold text-sm uppercase mb-2">🎉 SUBMIT YOUR {projectLabel.toUpperCase()}!</h3>
                      <p className="text-xs">Upload to YouTube, Google Drive, or any platform and paste the link.</p>
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔗 Link to Your {projectLabel}</label>
                      <input
                        type="url"
                        value={group.day5?.media_link || ""}
                        onChange={(e) => updateDay(5, 'media_link', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="https://..."
                        data-testid="day5-link"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 6 - Reflection */}
              {activeDay === 6 && (
                <div data-testid="day-6-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <RefreshCw className="w-6 h-6 text-[#A3E635]" />
                    Day 6: Reflection
                  </h2>
                  
                  <div className="bg-purple-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm mb-2">🪞 TIME TO REFLECT!</h3>
                    <p className="text-xs">Think about your experience. Be honest!</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📚 What did you learn?</label>
                      <textarea
                        value={group.day6?.what_learned || ""}
                        onChange={(e) => updateDay(6, 'what_learned', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="About the topic? About making a podcast/video? About English?"
                        data-testid="day6-learned"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">⚡ What was difficult?</label>
                      <textarea
                        value={group.day6?.challenges_faced || ""}
                        onChange={(e) => updateDay(6, 'challenges_faced', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="What challenges did you face?"
                        data-testid="day6-challenges"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">👥 How did you work as a team?</label>
                      <textarea
                        value={group.day6?.team_collaboration || ""}
                        onChange={(e) => updateDay(6, 'team_collaboration', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="Who did what? How did you communicate?"
                        data-testid="day6-team"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">⭐ How was the experience? (1-10)</label>
                      <textarea
                        value={group.day6?.overall_experience || ""}
                        onChange={(e) => updateDay(6, 'overall_experience', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="Rate 1-10 and explain why..."
                        data-testid="day6-experience"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col md:flex-row gap-3 mt-8 pt-6 border-t-2 border-black">
                <button
                  onClick={() => saveDay(activeDay)}
                  disabled={saving}
                  className="flex-1 bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                  data-testid="save-btn"
                >
                  <FileText className="w-5 h-5" />
                  {saving ? "Saving..." : saved ? "Saved!" : "Save"}
                </button>
                <button
                  onClick={() => markComplete(activeDay)}
                  disabled={saving}
                  className="flex-1 bg-[#A3E635] text-black border-2 border-black hover:bg-[#84cc16] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                  data-testid="complete-btn"
                >
                  <CheckCircle className="w-5 h-5" />
                  Complete Day {activeDay}
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

  const login = async () => {
    try {
      await axios.post(`${API}/teacher/login`, { password });
      setAuthenticated(true);
      fetchGroups();
    } catch (e) {
      setError("Incorrect password");
    }
  };

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${API}/groups`);
      setGroups(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteGroup = async (id) => {
    if (!window.confirm("Delete this group?")) return;
    try {
      await axios.delete(`${API}/groups/${id}`);
      setGroups(groups.filter(g => g.id !== id));
      if (selectedGroup?.id === id) setSelectedGroup(null);
    } catch (e) {
      console.error(e);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4" data-testid="teacher-login">
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Teacher Panel
          </h1>
          {error && <div className="bg-red-100 border-2 border-red-500 p-3 mb-4 text-red-700 font-medium">{error}</div>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && login()}
            className="w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4"
            placeholder="Password"
            data-testid="teacher-password"
          />
          <button onClick={login} className="w-full bg-black text-white border-2 border-black hover:bg-[#8B5CF6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase py-3" data-testid="teacher-login-btn">Enter</button>
          <button onClick={() => navigate('/')} className="w-full mt-3 text-gray-600 hover:text-black font-medium">← Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]" data-testid="teacher-dashboard">
      <header className="bg-black text-white p-4 border-b-4 border-[#8B5CF6]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6" />
            <span className="font-bold uppercase tracking-wider">Teacher Panel</span>
          </div>
          <button onClick={() => navigate('/')} className="hover:text-[#A3E635]">← Exit</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <h2 className="font-bold uppercase tracking-widest text-sm mb-4">Groups ({groups.length})</h2>
              {groups.length === 0 ? <p className="text-gray-500 text-sm">No groups yet</p> : (
                <div className="space-y-2">
                  {groups.map(g => {
                    const completed = [g.day1?.completed, g.day2?.completed, g.day3?.completed, g.day4?.completed, g.day5?.completed, g.day6?.completed].filter(Boolean).length;
                    return (
                      <div
                        key={g.id}
                        className={`border-2 border-black p-3 cursor-pointer ${selectedGroup?.id === g.id ? 'bg-[#8B5CF6] text-white' : 'bg-white hover:bg-gray-100'}`}
                        onClick={() => setSelectedGroup(g)}
                        data-testid={`teacher-group-${g.id}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold">{g.group_name}</h3>
                            <p className="text-xs opacity-75">{g.members?.join(", ")}</p>
                          </div>
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
                  <div>
                    <h2 className="text-2xl font-bold">{selectedGroup.group_name}</h2>
                    <p className="text-gray-600">{selectedGroup.members?.join(" • ")}</p>
                  </div>
                  <button onClick={() => deleteGroup(selectedGroup.id)} className="bg-red-500 text-white border-2 border-black p-2" data-testid="delete-group-btn"><Trash2 className="w-5 h-5" /></button>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map(day => {
                    const dayData = selectedGroup[`day${day}`];
                    const isComplete = dayData?.completed;
                    const titles = ["Planning", "Research", "Language", "Script", "Production", "Reflection"];
                    
                    return (
                      <div key={day} className={`border-2 border-black p-4 ${isComplete ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          {isComplete ? <CheckCircle className="w-5 h-5 text-green-600" /> : <div className="w-5 h-5 border-2 border-black rounded-full" />}
                          <h3 className="font-bold">Day {day}: {titles[day-1]}</h3>
                        </div>
                        
                        {day === 1 && dayData && (
                          <div className="text-sm space-y-1">
                            <p><strong>Topic:</strong> {dayData.topic || "-"}</p>
                            <p><strong>Why:</strong> {dayData.why_this_topic || "-"}</p>
                            <p><strong>Message:</strong> {dayData.what_to_communicate || "-"}</p>
                          </div>
                        )}
                        {day === 2 && dayData && (
                          <div className="text-sm space-y-1">
                            <p><strong>Sources:</strong> {dayData.sources || "-"}</p>
                            <p><strong>Facts:</strong> {dayData.learnings || "-"}</p>
                            <p><strong>Audience:</strong> {dayData.target_audience || "-"}</p>
                          </div>
                        )}
                        {day === 3 && dayData && (
                          <div className="text-sm space-y-1">
                            <p><strong>Grammar:</strong> {[
                              dayData.grammar_second_conditional && "Second Conditional ✓",
                              dayData.grammar_indefinite_pronouns && "Indefinite Pronouns ✓",
                              dayData.grammar_compound_nouns && "Compound Nouns ✓"
                            ].filter(Boolean).join(", ") || "-"}</p>
                            <p><strong>Vocabulary:</strong> {dayData.key_vocabulary || "-"}</p>
                            <p><strong>Intro:</strong> {dayData.introduction || "-"}</p>
                            <p><strong>Development:</strong> {dayData.development || "-"}</p>
                            <p><strong>Conclusion:</strong> {dayData.conclusion || "-"}</p>
                          </div>
                        )}
                        {day === 4 && dayData && (
                          <div className="text-sm space-y-1">
                            <p><strong>Duration:</strong> {dayData.estimated_duration || "-"}</p>
                            <p><strong>Script:</strong></p>
                            <pre className="bg-white border p-2 whitespace-pre-wrap text-xs max-h-40 overflow-y-auto">{dayData.draft_script || "-"}</pre>
                          </div>
                        )}
                        {day === 5 && dayData && (
                          <div className="text-sm space-y-1">
                            <p><strong>Rehearsal:</strong> {dayData.rehearsal_notes || "-"}</p>
                            <p><strong>Tools:</strong> {dayData.production_tools || "-"}</p>
                            {dayData.media_link && <p><strong>Link:</strong> <a href={dayData.media_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{dayData.media_link}</a></p>}
                          </div>
                        )}
                        {day === 6 && dayData && (
                          <div className="text-sm space-y-1">
                            <p><strong>Learned:</strong> {dayData.what_learned || "-"}</p>
                            <p><strong>Challenges:</strong> {dayData.challenges_faced || "-"}</p>
                            <p><strong>Teamwork:</strong> {dayData.team_collaboration || "-"}</p>
                            <p><strong>Experience:</strong> {dayData.overall_experience || "-"}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-12 text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Select a group to view</p>
              </div>
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
