import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mic, Users, BookOpen, Target, Search, MessageSquare, FileText, CheckCircle, Lock, Trash2, Eye, ChevronRight, PenTool, Sparkles } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ============ LANDING PAGE ============
const Landing = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", members: ["", "", ""] });
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
      setError("Escribe un nombre para el grupo");
      return;
    }
    const validMembers = newGroup.members.filter(m => m.trim());
    if (validMembers.length < 1) {
      setError("Añade al menos un miembro");
      return;
    }
    try {
      const res = await axios.post(`${API}/groups`, {
        group_name: newGroup.name,
        members: validMembers
      });
      navigate(`/project/${res.data.id}`);
    } catch (e) {
      setError(e.response?.data?.detail || "Error al crear el grupo");
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
            <Mic className="w-8 h-8" />
            <span className="font-bold text-xl uppercase tracking-wider">The Studio</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-black mb-4" style={{fontFamily: 'Outfit, sans-serif'}}>
            Diario de Podcast
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto" style={{fontFamily: 'Manrope, sans-serif'}}>
            Crea tu podcast paso a paso. 5 días, 5 niveles. ¡Completa tu misión!
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
            Nuevo Grupo
          </button>
          <button
            onClick={() => navigate('/teacher')}
            className="bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase tracking-wide py-4 px-8 flex items-center justify-center gap-2 transition-all"
            data-testid="teacher-btn"
          >
            <Lock className="w-5 h-5" />
            Panel Profesor
          </button>
        </div>

        {/* Create Group Modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" data-testid="create-group-modal">
            <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#8B5CF6]" />
                Nuevo Grupo
              </h2>
              
              {error && (
                <div className="bg-red-100 border-2 border-red-500 p-3 mb-4 text-red-700 font-medium">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold uppercase tracking-widest block mb-2">Nombre del Grupo</label>
                  <input
                    type="text"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                    className="w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] focus:border-black outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    placeholder="Ej: Los Informadores"
                    data-testid="group-name-input"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-bold uppercase tracking-widest block mb-2">Miembros</label>
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
                      placeholder={`Estudiante ${i + 1}`}
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
                  Cancelar
                </button>
                <button
                  onClick={createGroup}
                  className="flex-1 bg-black text-white border-2 border-black hover:bg-[#8B5CF6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase py-3"
                  data-testid="confirm-create-btn"
                >
                  Crear
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
              Continuar Proyecto
            </h2>
            <div className="grid gap-4">
              {groups.map(g => {
                const completed = [g.day1?.completed, g.day2?.completed, g.day3?.completed, g.day4?.completed, g.day5?.completed].filter(Boolean).length;
                return (
                  <button
                    key={g.id}
                    onClick={() => selectGroup(g.id)}
                    className="w-full bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all text-left flex items-center justify-between"
                    data-testid={`group-card-${g.id}`}
                  >
                    <div>
                      <h3 className="font-bold text-lg">{g.group_name}</h3>
                      <p className="text-gray-600 text-sm">{g.members?.join(", ")}</p>
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

  if (!group) return <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center"><div className="animate-pulse text-xl font-bold">Cargando...</div></div>;

  const days = [
    { num: 1, title: "Planificación", icon: Target, color: "#8B5CF6" },
    { num: 2, title: "Investigación", icon: Search, color: "#F472B6" },
    { num: 3, title: "Estructura", icon: MessageSquare, color: "#06B6D4" },
    { num: 4, title: "Borrador", icon: PenTool, color: "#F59E0B" },
    { num: 5, title: "Final", icon: Mic, color: "#A3E635" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]" data-testid="project-page">
      {/* Header */}
      <header className="bg-black text-white p-4 border-b-4 border-[#A3E635]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:text-[#A3E635] transition-colors">
            <Mic className="w-6 h-6" />
            <span className="font-bold uppercase tracking-wider hidden md:inline">The Studio</span>
          </button>
          <div className="text-center">
            <h1 className="font-bold text-lg">{group.group_name}</h1>
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
              <h2 className="font-bold uppercase tracking-widest text-sm mb-4">Niveles</h2>
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
                        <div className="font-bold text-sm">Día {d.num}</div>
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
                    Día 1: Planificación
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🎯 Tema elegido</label>
                      <input
                        type="text"
                        value={group.day1?.topic || ""}
                        onChange={(e) => updateDay(1, 'topic', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="¿Sobre qué trata tu podcast?"
                        data-testid="day1-topic"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔄 Temas alternativos o relacionados</label>
                      <textarea
                        value={group.day1?.alternative_topics || ""}
                        onChange={(e) => updateDay(1, 'alternative_topics', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="¿Qué otros temas podrías haber elegido?"
                        data-testid="day1-alternatives"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">❓ ¿Por qué este tema?</label>
                      <textarea
                        value={group.day1?.why_this_topic || ""}
                        onChange={(e) => updateDay(1, 'why_this_topic', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="¿Por qué es importante? ¿Por qué os interesa?"
                        data-testid="day1-why"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📢 ¿Qué quieres comunicar?</label>
                      <textarea
                        value={group.day1?.what_to_communicate || ""}
                        onChange={(e) => updateDay(1, 'what_to_communicate', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="¿Cuál es el mensaje principal?"
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
                    Día 2: Investigación
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔍 ¿Dónde has buscado información?</label>
                      <textarea
                        value={group.day2?.sources || ""}
                        onChange={(e) => updateDay(2, 'sources', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="Páginas web, libros, entrevistas, videos..."
                        data-testid="day2-sources"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">💡 ¿Qué has aprendido?</label>
                      <textarea
                        value={group.day2?.learnings || ""}
                        onChange={(e) => updateDay(2, 'learnings', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[120px]"
                        placeholder="Datos interesantes, hechos importantes..."
                        data-testid="day2-learnings"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">👥 ¿A quién le interesa esta información?</label>
                      <textarea
                        value={group.day2?.target_audience || ""}
                        onChange={(e) => updateDay(2, 'target_audience', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="¿Quién es tu audiencia? ¿Jóvenes, adultos, expertos...?"
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
                    Día 3: Estructura del Mensaje
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gray-100 border-2 border-black p-4 mb-4">
                      <p className="font-bold text-sm">📝 Las 3 partes de tu mensaje:</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">1️⃣ Introducción</label>
                      <textarea
                        value={group.day3?.part1 || ""}
                        onChange={(e) => updateDay(3, 'part1', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="¿Cómo empezarás? ¿Qué gancho usarás?"
                        data-testid="day3-part1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">2️⃣ Desarrollo</label>
                      <textarea
                        value={group.day3?.part2 || ""}
                        onChange={(e) => updateDay(3, 'part2', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="Puntos principales que vas a explicar"
                        data-testid="day3-part2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">3️⃣ Conclusión</label>
                      <textarea
                        value={group.day3?.part3 || ""}
                        onChange={(e) => updateDay(3, 'part3', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="¿Cómo cerrarás? ¿Qué quieres que recuerden?"
                        data-testid="day3-part3"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🗣️ Lenguaje a utilizar</label>
                      <input
                        type="text"
                        value={group.day3?.language_style || ""}
                        onChange={(e) => updateDay(3, 'language_style', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="Formal, informal, técnico, cercano..."
                        data-testid="day3-language"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📚 Vocabulario clave</label>
                      <textarea
                        value={group.day3?.key_vocabulary || ""}
                        onChange={(e) => updateDay(3, 'key_vocabulary', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="Palabras importantes que vas a usar"
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
                    Día 4: Primer Borrador
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-yellow-100 border-2 border-black p-4 mb-4">
                      <p className="font-bold text-sm">✏️ Escribe tu primer guion. ¡No tiene que ser perfecto!</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📄 Script / Guion</label>
                      <textarea
                        value={group.day4?.draft_script || ""}
                        onChange={(e) => updateDay(4, 'draft_script', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[300px] font-mono text-sm"
                        placeholder="[INTRO]&#10;Hola, bienvenidos a...&#10;&#10;[DESARROLLO]&#10;Hoy vamos a hablar de...&#10;&#10;[CIERRE]&#10;Gracias por escucharnos..."
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
                    <Mic className="w-6 h-6 text-[#A3E635]" />
                    Día 5: Versión Final
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-green-100 border-2 border-black p-4 mb-4">
                      <p className="font-bold text-sm">🎉 ¡Último paso! Revisa y mejora tu guion.</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📄 Script Final</label>
                      <textarea
                        value={group.day5?.final_script || ""}
                        onChange={(e) => updateDay(5, 'final_script', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[300px] font-mono text-sm"
                        placeholder="Tu guion final revisado y corregido..."
                        data-testid="day5-script"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔗 Enlace al video/podcast</label>
                      <input
                        type="url"
                        value={group.day5?.media_link || ""}
                        onChange={(e) => updateDay(5, 'media_link', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="https://youtube.com/... o https://drive.google.com/..."
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
                  {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar"}
                </button>
                <button
                  onClick={() => markComplete(activeDay)}
                  disabled={saving}
                  className="flex-1 bg-[#A3E635] text-black border-2 border-black hover:bg-[#84cc16] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                  data-testid="complete-btn"
                >
                  <CheckCircle className="w-5 h-5" />
                  Completar Día {activeDay}
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
      setError("Contraseña incorrecta");
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
    if (!window.confirm("¿Seguro que quieres eliminar este grupo?")) return;
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
            Panel Profesor
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
            placeholder="Contraseña"
            data-testid="teacher-password"
          />
          <button
            onClick={login}
            className="w-full bg-black text-white border-2 border-black hover:bg-[#8B5CF6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase py-3"
            data-testid="teacher-login-btn"
          >
            Entrar
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full mt-3 text-gray-600 hover:text-black font-medium"
          >
            ← Volver al inicio
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
            <span className="font-bold uppercase tracking-wider">Panel Profesor</span>
          </div>
          <button onClick={() => navigate('/')} className="hover:text-[#A3E635] transition-colors">
            ← Salir
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
                Grupos ({groups.length})
              </h2>
              {groups.length === 0 ? (
                <p className="text-gray-500 text-sm">No hay grupos todavía</p>
              ) : (
                <div className="space-y-2">
                  {groups.map(g => {
                    const completed = [g.day1?.completed, g.day2?.completed, g.day3?.completed, g.day4?.completed, g.day5?.completed].filter(Boolean).length;
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
                          <div>
                            <h3 className="font-bold">{g.group_name}</h3>
                            <p className="text-xs opacity-75">{g.members?.join(", ")}</p>
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
                  <div>
                    <h2 className="text-2xl font-bold">{selectedGroup.group_name}</h2>
                    <p className="text-gray-600">{selectedGroup.members?.join(" • ")}</p>
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
                    const titles = ["Planificación", "Investigación", "Estructura", "Borrador", "Final"];
                    
                    return (
                      <div key={day} className={`border-2 border-black p-4 ${isComplete ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          {isComplete ? <CheckCircle className="w-5 h-5 text-green-600" /> : <div className="w-5 h-5 border-2 border-black rounded-full" />}
                          <h3 className="font-bold">Día {day}: {titles[day-1]}</h3>
                        </div>
                        
                        {day === 1 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>Tema:</strong> {dayData.topic || "-"}</p>
                            <p><strong>Alternativos:</strong> {dayData.alternative_topics || "-"}</p>
                            <p><strong>Por qué:</strong> {dayData.why_this_topic || "-"}</p>
                            <p><strong>Comunicar:</strong> {dayData.what_to_communicate || "-"}</p>
                          </div>
                        )}
                        {day === 2 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>Fuentes:</strong> {dayData.sources || "-"}</p>
                            <p><strong>Aprendizajes:</strong> {dayData.learnings || "-"}</p>
                            <p><strong>Audiencia:</strong> {dayData.target_audience || "-"}</p>
                          </div>
                        )}
                        {day === 3 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>Parte 1:</strong> {dayData.part1 || "-"}</p>
                            <p><strong>Parte 2:</strong> {dayData.part2 || "-"}</p>
                            <p><strong>Parte 3:</strong> {dayData.part3 || "-"}</p>
                            <p><strong>Lenguaje:</strong> {dayData.language_style || "-"}</p>
                            <p><strong>Vocabulario:</strong> {dayData.key_vocabulary || "-"}</p>
                          </div>
                        )}
                        {day === 4 && dayData && (
                          <div className="text-sm">
                            <p><strong>Borrador:</strong></p>
                            <pre className="bg-white border border-gray-300 p-2 mt-1 whitespace-pre-wrap text-xs max-h-40 overflow-y-auto">{dayData.draft_script || "-"}</pre>
                          </div>
                        )}
                        {day === 5 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>Script Final:</strong></p>
                            <pre className="bg-white border border-gray-300 p-2 whitespace-pre-wrap text-xs max-h-40 overflow-y-auto">{dayData.final_script || "-"}</pre>
                            {dayData.media_link && (
                              <p><strong>Enlace:</strong> <a href={dayData.media_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{dayData.media_link}</a></p>
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
                <p className="text-gray-500">Selecciona un grupo para ver sus respuestas</p>
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
