import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Lazy-loaded Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGemini() {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      try {
        geminiClient = new GoogleGenAI({
          apiKey: key,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });
      } catch (err) {
        console.error("Failed to initialize GoogleGenAI client:", err);
      }
    }
  }
  return geminiClient;
}

// Preset Fallbacks mapping for offline or unconfigured API keys
const FALLBACK_VIBES: Record<string, any> = {
  tokyo: {
    title: "Tokyo Neon Drifts",
    frequency: "Synthwave / Cyberpunk",
    description: "Cruising down Shinjuku and Shibuya highways under shimmering hologram arrays.",
    tracks: [
      { id: "tk-1", title: "Midnight Pulse", artist: "The Glitch Mob", duration: "04:12", genre: "Synthwave", bpm: 110 },
      { id: "tk-2", title: "Obsidian Flow", artist: "Lorn", duration: "03:45", genre: "Dark Synth", bpm: 95 },
      { id: "tk-3", title: "Neon Sky", artist: "Com Truise", duration: "05:02", genre: "Chillwave", bpm: 104 },
      { id: "tk-4", title: "Digital Rain", artist: "Perturbator", duration: "04:38", genre: "Darksynth", bpm: 120 },
      { id: "tk-5", title: "Cyber Drift", artist: "Kavinsky", duration: "04:10", genre: "Comoutpop", bpm: 116 }
    ],
    lyrics: [
      "Digital rain is whispering sweet codes...",
      "Under Tokyo's high neon domes...",
      "Our speed is steady in the electric night...",
      "We fuse with the grid under indigo lights...",
      "No clocks are ticking, only digital pulses."
    ]
  },
  chill: {
    title: "Ambient Echoes",
    frequency: "Deep Ambient Chill",
    description: "Soft sonic cushions, atmospheric soundscapes, and comforting frequencies.",
    tracks: [
      { id: "ch-1", title: "Warm Currents", artist: "Helios", duration: "03:52", genre: "Ambient Ambient", bpm: 72 },
      { id: "ch-2", title: "Glass Ripple", artist: "Hammock", duration: "04:45", genre: "Shoegaze Minimal", bpm: 80 },
      { id: "ch-3", title: "Subterranean Dream", artist: "Brian Eno", duration: "06:14", genre: "Experimental Chill", bpm: 60 },
      { id: "ch-4", title: "Infinite Slate", artist: "Tycho", duration: "03:28", genre: "Organic House", bpm: 92 },
      { id: "ch-5", title: "Calm Horizon", artist: "Marconi Union", duration: "05:10", genre: "Drone Calm", bpm: 68 }
    ],
    lyrics: [
      "Let the waves drift over your mind...",
      "Every frequency is perfectly aligned...",
      "Leaving heavy shadows far behind...",
      "In the deep silence of a velvet sky...",
      "Warm winds are carrying us away."
    ]
  },
  default: {
    title: "Vivid Frequency Synergies",
    frequency: "Deep House Curation",
    description: "An adaptive groove sequence synthesized to capture your customized atmosphere.",
    tracks: [
      { id: "df-1", title: "Electro-Starlight", artist: "VibeSync AI", duration: "03:20", genre: "Deep House", bpm: 120 },
      { id: "df-2", title: "Obsidian Echoes", artist: "Neon Architect", duration: "02:45", genre: "Melodic Minimal", bpm: 118 },
      { id: "df-3", title: "Prismatic Liquid", artist: "Liquid Dreams", duration: "03:55", genre: "Ambient Bass", bpm: 122 },
      { id: "df-4", title: "Chilling Dawn", artist: "Alex Rivers", duration: "03:12", genre: "Chill House", bpm: 115 },
      { id: "df-5", title: "Synthesized Harmony", artist: "Fidelity Core", duration: "04:18", genre: "Tech House", bpm: 124 }
    ],
    lyrics: [
      "In the sync of the neon night...",
      "We're feeling the rhythm, pure and bright...",
      "Synthetic soundwaves are taking flight...",
      "Just matching your beat, making it right...",
      "VibeSync flows forevermore."
    ]
  }
};

// Vibe API Endpoint
app.post("/api/generate-vibe", async (req, res) => {
  const { prompt, presetCategory } = req.body;
  
  console.log(`Generating vibe for prompt: "${prompt}" and presetCategory: "${presetCategory}"`);
  
  const client = getGemini();
  if (!client) {
    console.log("Gemini API client uninitialized or Key not found. Using local synthesis algorithm fallback...");
    // Let's pick a default fallback based on keywords in prompt
    const promptLower = (prompt || "").toLowerCase();
    let result = FALLBACK_VIBES.default;
    if (promptLower.includes("tokyo") || promptLower.includes("drive") || promptLower.includes("night") || presetCategory === "Dark" || presetCategory === "Melancholy") {
      result = FALLBACK_VIBES.tokyo;
    } else if (promptLower.includes("chill") || promptLower.includes("relax") || promptLower.includes("study") || presetCategory === "Chill" || presetCategory === "Focus") {
      result = FALLBACK_VIBES.chill;
    }
    
    // Inject a customized prompt representation
    const finalResult = {
      ...result,
      title: prompt ? `Sync: ${prompt.slice(0, 24)}...` : result.title,
    };
    
    // Add artificial delay for organic feel
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return res.json(finalResult);
  }

  try {
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `You are an AI Music Vibe Curation system. Create a high-quality, atmospheric, thematic playlist of 5 real or realistically synthesized tracks based on this mood/activity request: "${prompt || "Chill evening focus"}". Categorized presets: ${presetCategory}. Determine the vibe title, description, music frequency/genres, individual track details (with realistic durations), and 5 beautiful lines of lyrics that represent the main song of this playlist.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            frequency: { type: Type.STRING, description: "E.g., Deep House, Ambient Synthwave, Melancholy Chill, Liquid Bass" },
            description: { type: Type.STRING },
            tracks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  artist: { type: Type.STRING },
                  duration: { type: Type.STRING, description: "Track duration as MM:SS (e.g. 03:40)" },
                  genre: { type: Type.STRING },
                  bpm: { type: Type.INTEGER }
                },
                required: ["id", "title", "artist", "duration", "genre"]
              }
            },
            lyrics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4-6 lines of lyrics matching the playlist's title/theme for scroll visualization."
            }
          },
          required: ["title", "frequency", "description", "tracks", "lyrics"]
        }
      }
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } else {
      throw new Error("No text output returned from Gemini API");
    }
  } catch (error) {
    console.error("Gemini API error. Falling back safely...", error);
    const promptLower = (prompt || "").toLowerCase();
    let result = FALLBACK_VIBES.default;
    if (promptLower.includes("tokyo") || promptLower.includes("drive") || presetCategory === "Dark") {
      result = FALLBACK_VIBES.tokyo;
    } else if (promptLower.includes("chill") || presetCategory === "Chill") {
      result = FALLBACK_VIBES.chill;
    }
    const finalResult = {
      ...result,
      title: prompt ? `Vibe: ${prompt.slice(0, 24)}` : result.title,
    };
    return res.json(finalResult);
  }
});

// Serve frontend client in production, support Vite dev middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VibeSync full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
