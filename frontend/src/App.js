import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mic, Video, Users, BookOpen, Target, Search, MessageSquare, FileText, CheckCircle, Lock, Trash2, Eye, ChevronRight, PenTool, Sparkles, Globe } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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

  const selectGroup = (id) => {
    navigate(`/project/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8" data-testid="landing-page">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(139,92,246,1)] mb-6">
            <Globe className="w-8 h-8" />
            <span className="font-bold text-xl uppercase tracking-wider">The Studio</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-black mb-4" style={{fontFamily: 'Outfit, sans-serif'}}>
            Global Issues:<br/>Making a Difference
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto" style={{fontFamily: 'Manrope, sans-serif'}}>
            Create your podcast or video log step by step. 5 days, 5 levels. Complete your mission!
          </p>
        </header>

        {/* Actions */}
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

        {/* Create Group Modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" data-testid="create-group-modal">
            <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#8B5CF6]" />
                New Group
              </h2>
              
              {error && (
                <div className="bg-red-100 border-2 border-red-500 p-3 mb-4 text-red-700 font-medium">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold uppercase tracking-widest block mb-2">Group Name</label>
                  <input
                    type="text"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                    className="w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] focus:border-black outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    placeholder="E.g.: The Change Makers"
                    data-testid="group-name-input"
                  />
                </div>

                {/* Project Type Selection */}
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
                      className="w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] focus:border-black outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-2"
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

        {/* Existing Groups */}
        {groups.length > 0 && (
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Continue Project
            </h2>
            <div className="grid gap-4">
              {groups.map(g => {
                const completed = [g.day1?.completed, g.day2?.completed, g.day3?.completed, g.day4?.completed, g.day5?.completed].filter(Boolean).length;
                const isPodcast = g.project_type === 'podcast' || !g.project_type;
                return (
                  <button
                    key={g.id}
                    onClick={() => selectGroup(g.id)}
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
                      <div className="bg-[#A3E635] border-2 border-black px-3 py-1 font-bold text-sm">
                        {completed}/5
                      </div>
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

// ============ PROJECT PAGE (SURVEY) ============
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
      // Find first incomplete day
      const days = [res.data.day1, res.data.day2, res.data.day3, res.data.day4, res.data.day5];
      const firstIncomplete = days.findIndex(d => !d?.completed);
      setActiveDay(firstIncomplete === -1 ? 5 : firstIncomplete + 1);
    } catch (e) {
      console.error(e);
      navigate('/');
    }
  };

  const updateDay = (day, field, value) => {
    setGroup(prev => ({
      ...prev,
      [`day${day}`]: {
        ...prev[`day${day}`],
        [field]: value
      }
    }));
    setSaved(false);
  };

  const saveDay = async (day) => {
    setSaving(true);
    try {
      await axios.put(`${API}/groups/${groupId}/day`, {
        day: day,
        data: group[`day${day}`]
      });
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
      await axios.put(`${API}/groups/${groupId}/day`, {
        day: day,
        data: dayData
      });
      setGroup(prev => ({
        ...prev,
        [`day${day}`]: dayData
      }));
      if (day < 5) setActiveDay(day + 1);
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
    { num: 3, title: "Structure", icon: MessageSquare, color: "#06B6D4" },
    { num: 4, title: "Draft", icon: PenTool, color: "#F59E0B" },
    { num: 5, title: "Final", icon: isPodcast ? Mic : Video, color: "#A3E635" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]" data-testid="project-page">
      {/* Header */}
      <header className="bg-black text-white p-4 border-b-4 border-[#A3E635]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:text-[#A3E635] transition-colors">
            <Globe className="w-6 h-6" />
            <span className="font-bold uppercase tracking-wider hidden md:inline">Global Issues</span>
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
          {/* Day Navigation */}
          <div className="md:col-span-3">
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <h2 className="font-bold uppercase tracking-widest text-sm mb-4">Levels</h2>
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
                      {isComplete ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <d.icon className="w-5 h-5 flex-shrink-0" style={{color: isActive ? 'white' : d.color}} />
                      )}
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
              {/* Day 1 */}
              {activeDay === 1 && (
                <div data-testid="day-1-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6 text-[#8B5CF6]" />
                    Day 1: Planning
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🎯 Chosen Topic (Global Issue)</label>
                      <input
                        type="text"
                        value={group.day1?.topic || ""}
                        onChange={(e) => updateDay(1, 'topic', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="What global issue is your {projectLabel} about?"
                        data-testid="day1-topic"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔄 Alternative or Related Topics</label>
                      <textarea
                        value={group.day1?.alternative_topics || ""}
                        onChange={(e) => updateDay(1, 'alternative_topics', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="What other topics could you have chosen?"
                        data-testid="day1-alternatives"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">❓ Why This Topic?</label>
                      <textarea
                        value={group.day1?.why_this_topic || ""}
                        onChange={(e) => updateDay(1, 'why_this_topic', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="Why is it important? Why does it interest you?"
                        data-testid="day1-why"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📢 What Do You Want to Communicate?</label>
                      <textarea
                        value={group.day1?.what_to_communicate || ""}
                        onChange={(e) => updateDay(1, 'what_to_communicate', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="What is the main message?"
                        data-testid="day1-communicate"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Day 2 */}
              {activeDay === 2 && (
                <div data-testid="day-2-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <Search className="w-6 h-6 text-[#F472B6]" />
                    Day 2: Research
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔍 Where Did You Find Information?</label>
                      <textarea
                        value={group.day2?.sources || ""}
                        onChange={(e) => updateDay(2, 'sources', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="Websites, books, interviews, videos..."
                        data-testid="day2-sources"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">💡 What Did You Learn?</label>
                      <textarea
                        value={group.day2?.learnings || ""}
                        onChange={(e) => updateDay(2, 'learnings', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[120px]"
                        placeholder="Interesting facts, important data..."
                        data-testid="day2-learnings"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">👥 Who Would Be Interested in This Information?</label>
                      <textarea
                        value={group.day2?.target_audience || ""}
                        onChange={(e) => updateDay(2, 'target_audience', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="Who is your audience? Teenagers, adults, experts...?"
                        data-testid="day2-audience"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Day 3 */}
              {activeDay === 3 && (
                <div data-testid="day-3-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-[#06B6D4]" />
                    Day 3: Message Structure
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gray-100 border-2 border-black p-4 mb-4">
                      <p className="font-bold text-sm">📝 The 3 Parts of Your Message:</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">1️⃣ Introduction</label>
                      <textarea
                        value={group.day3?.part1 || ""}
                        onChange={(e) => updateDay(3, 'part1', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="How will you start? What hook will you use?"
                        data-testid="day3-part1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">2️⃣ Development</label>
                      <textarea
                        value={group.day3?.part2 || ""}
                        onChange={(e) => updateDay(3, 'part2', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="Main points you will explain"
                        data-testid="day3-part2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">3️⃣ Conclusion</label>
                      <textarea
                        value={group.day3?.part3 || ""}
                        onChange={(e) => updateDay(3, 'part3', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="How will you close? What do you want them to remember?"
                        data-testid="day3-part3"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🗣️ Language Style</label>
                      <input
                        type="text"
                        value={group.day3?.language_style || ""}
                        onChange={(e) => updateDay(3, 'language_style', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="Formal, informal, technical, friendly..."
                        data-testid="day3-language"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📚 Key Vocabulary</label>
                      <textarea
                        value={group.day3?.key_vocabulary || ""}
                        onChange={(e) => updateDay(3, 'key_vocabulary', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="Important words you will use"
                        data-testid="day3-vocabulary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Day 4 */}
              {activeDay === 4 && (
                <div data-testid="day-4-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <PenTool className="w-6 h-6 text-[#F59E0B]" />
                    Day 4: First Draft
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-yellow-100 border-2 border-black p-4 mb-4">
                      <p className="font-bold text-sm">✏️ Write your first script. It doesn't have to be perfect!</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📄 Script / Screenplay</label>
                      <textarea
                        value={group.day4?.draft_script || ""}
                        onChange={(e) => updateDay(4, 'draft_script', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[300px] font-mono text-sm"
                        placeholder="[INTRO]&#10;Hello, welcome to...&#10;&#10;[DEVELOPMENT]&#10;Today we're going to talk about...&#10;&#10;[CLOSING]&#10;Thank you for listening/watching..."
                        data-testid="day4-script"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Day 5 */}
              {activeDay === 5 && (
                <div data-testid="day-5-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    {isPodcast ? <Mic className="w-6 h-6 text-[#A3E635]" /> : <Video className="w-6 h-6 text-[#A3E635]" />}
                    Day 5: Final Version
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-green-100 border-2 border-black p-4 mb-4">
                      <p className="font-bold text-sm">🎉 Last step! Review and improve your script.</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📄 Final Script</label>
                      <textarea
                        value={group.day5?.final_script || ""}
                        onChange={(e) => updateDay(5, 'final_script', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[300px] font-mono text-sm"
                        placeholder="Your final reviewed and corrected script..."
                        data-testid="day5-script"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔗 Link to Your {projectLabel}</label>
                      <input
                        type="url"
                        value={group.day5?.media_link || ""}
                        onChange={(e) => updateDay(5, 'media_link', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="https://youtube.com/... or https://drive.google.com/..."
                        data-testid="day5-link"
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
    if (!window.confirm("Are you sure you want to delete this group?")) return;
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
          {error && (
            <div className="bg-red-100 border-2 border-red-500 p-3 mb-4 text-red-700 font-medium">
              {error}
            </div>
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && login()}
            className="w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4"
            placeholder="Password"
            data-testid="teacher-password"
          />
          <button
            onClick={login}
            className="w-full bg-black text-white border-2 border-black hover:bg-[#8B5CF6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase py-3"
            data-testid="teacher-login-btn"
          >
            Enter
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full mt-3 text-gray-600 hover:text-black font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]" data-testid="teacher-dashboard">
      {/* Header */}
      <header className="bg-black text-white p-4 border-b-4 border-[#8B5CF6]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6" />
            <span className="font-bold uppercase tracking-wider">Teacher Panel</span>
          </div>
          <button onClick={() => navigate('/')} className="hover:text-[#A3E635] transition-colors">
            ← Exit
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Groups List */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <h2 className="font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Groups ({groups.length})
              </h2>
              {groups.length === 0 ? (
                <p className="text-gray-500 text-sm">No groups yet</p>
              ) : (
                <div className="space-y-2">
                  {groups.map(g => {
                    const completed = [g.day1?.completed, g.day2?.completed, g.day3?.completed, g.day4?.completed, g.day5?.completed].filter(Boolean).length;
                    const isPodcast = g.project_type === 'podcast' || !g.project_type;
                    return (
                      <div
                        key={g.id}
                        className={`border-2 border-black p-3 cursor-pointer transition-all ${
                          selectedGroup?.id === g.id ? 'bg-[#8B5CF6] text-white' : 'bg-white hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedGroup(g)}
                        data-testid={`teacher-group-${g.id}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            {isPodcast ? <Mic className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                            <div>
                              <h3 className="font-bold">{g.group_name}</h3>
                              <p className="text-xs opacity-75">{g.members?.join(", ")}</p>
                            </div>
                          </div>
                          <div className={`px-2 py-1 text-xs font-bold border-2 ${selectedGroup?.id === g.id ? 'border-white' : 'border-black bg-[#A3E635]'}`}>
                            {completed}/5
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Group Details */}
          <div className="lg:col-span-2">
            {selectedGroup ? (
              <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    {(selectedGroup.project_type === 'podcast' || !selectedGroup.project_type) ? 
                      <Mic className="w-6 h-6 text-[#8B5CF6]" /> : 
                      <Video className="w-6 h-6 text-[#F472B6]" />
                    }
                    <div>
                      <h2 className="text-2xl font-bold">{selectedGroup.group_name}</h2>
                      <p className="text-gray-600">{selectedGroup.members?.join(" • ")}</p>
                      <span className="text-sm text-gray-500">
                        {(selectedGroup.project_type === 'podcast' || !selectedGroup.project_type) ? 'Radio Podcast' : 'Video Log'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteGroup(selectedGroup.id)}
                    className="bg-red-500 text-white border-2 border-black p-2 hover:bg-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    data-testid="delete-group-btn"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Day Responses */}
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(day => {
                    const dayData = selectedGroup[`day${day}`];
                    const isComplete = dayData?.completed;
                    const titles = ["Planning", "Research", "Structure", "Draft", "Final"];
                    
                    return (
                      <div key={day} className={`border-2 border-black p-4 ${isComplete ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          {isComplete ? <CheckCircle className="w-5 h-5 text-green-600" /> : <div className="w-5 h-5 border-2 border-black rounded-full" />}
                          <h3 className="font-bold">Day {day}: {titles[day-1]}</h3>
                        </div>
                        
                        {day === 1 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>Topic:</strong> {dayData.topic || "-"}</p>
                            <p><strong>Alternatives:</strong> {dayData.alternative_topics || "-"}</p>
                            <p><strong>Why:</strong> {dayData.why_this_topic || "-"}</p>
                            <p><strong>Communicate:</strong> {dayData.what_to_communicate || "-"}</p>
                          </div>
                        )}
                        {day === 2 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>Sources:</strong> {dayData.sources || "-"}</p>
                            <p><strong>Learnings:</strong> {dayData.learnings || "-"}</p>
                            <p><strong>Audience:</strong> {dayData.target_audience || "-"}</p>
                          </div>
                        )}
                        {day === 3 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>Part 1:</strong> {dayData.part1 || "-"}</p>
                            <p><strong>Part 2:</strong> {dayData.part2 || "-"}</p>
                            <p><strong>Part 3:</strong> {dayData.part3 || "-"}</p>
                            <p><strong>Language:</strong> {dayData.language_style || "-"}</p>
                            <p><strong>Vocabulary:</strong> {dayData.key_vocabulary || "-"}</p>
                          </div>
                        )}
                        {day === 4 && dayData && (
                          <div className="text-sm">
                            <p><strong>Draft:</strong></p>
                            <pre className="bg-white border border-gray-300 p-2 mt-1 whitespace-pre-wrap text-xs max-h-40 overflow-y-auto">{dayData.draft_script || "-"}</pre>
                          </div>
                        )}
                        {day === 5 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>Final Script:</strong></p>
                            <pre className="bg-white border border-gray-300 p-2 whitespace-pre-wrap text-xs max-h-40 overflow-y-auto">{dayData.final_script || "-"}</pre>
                            {dayData.media_link && (
                              <p><strong>Link:</strong> <a href={dayData.media_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{dayData.media_link}</a></p>
                            )}
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
                <p className="text-gray-500">Select a group to view their responses</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ APP ============
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
