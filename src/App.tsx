import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

type Screen =
  | "welcome"
  | "house"
  | "kitchen"
  | "playroom"
  | "bedroom"
  | "pizza"
  | "icecream"
  | "soup"
  | "shapes"
  | "colors"
  | "teaparty"
  | "blocks";

// --- Celebration overlay ---
function Celebration({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onDone}
    >
      <div className="animate-bounce-in bg-white rounded-3xl p-8 mx-4 text-center shadow-2xl max-w-sm">
        <div className="text-6xl mb-4">
          <span className="star">&#11088;</span>
          <span className="star">&#11088;</span>
          <span className="star">&#11088;</span>
        </div>
        <h2
          className="text-3xl font-black mb-3"
          style={{ color: "#e74c3c" }}
        >
          YAY!
        </h2>
        <p className="text-xl font-bold" style={{ color: "#2d3436" }}>
          {message}
        </p>
        <div className="text-5xl mt-4">
          <span className="star">&#127881;</span>
          <span className="star">&#127882;</span>
          <span className="star">&#127881;</span>
        </div>
        <p className="mt-4 text-lg font-semibold" style={{ color: "#636e72" }}>
          Tap to continue!
        </p>
      </div>
    </div>
  );
}

// --- Back button ---
function BackButton({ onClick, color }: { onClick: () => void; color: string }) {
  return (
    <button className="back-btn" style={{ background: color, color: "#fff" }} onClick={onClick}>
      &#8592;
    </button>
  );
}

// --- Stars counter ---
function StarsDisplay({ count }: { count: number }) {
  return (
    <div className="fixed top-4 right-4 z-50 bg-yellow-400 text-white font-black text-xl px-5 py-3 rounded-full shadow-lg flex items-center gap-2">
      <span>&#11088;</span> {count}
    </div>
  );
}

// --- Welcome screen ---
function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background: "linear-gradient(180deg, #87CEEB 0%, #98FB98 60%, #90EE90 100%)",
      }}
    >
      {/* Sun */}
      <div
        className="animate-float text-8xl mb-2"
        style={{ position: "absolute", top: 30, right: 40 }}
      >
        &#9728;&#65039;
      </div>

      {/* House */}
      <div className="animate-bounce-in mb-6">
        <div className="text-center">
          <div className="text-9xl">&#127968;</div>
        </div>
      </div>

      <h1
        className="text-5xl font-black mb-3 text-center animate-rainbow"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.15)" }}
      >
        Avery&apos;s House
      </h1>

      <p className="text-2xl font-bold text-white mb-8 text-center" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.2)" }}>
        Tap to come inside!
      </p>

      <button
        onClick={onEnter}
        className="room-btn animate-wiggle"
        style={{
          background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
          color: "#fff",
          fontSize: "1.6rem",
          minWidth: 200,
          minHeight: 80,
        }}
      >
        <span className="text-4xl">&#128075;</span>
        Let&apos;s Play!
      </button>

      {/* Decorative elements */}
      <div className="flex gap-4 mt-8 text-4xl">
        <span className="animate-float" style={{ animationDelay: "0s" }}>&#127803;</span>
        <span className="animate-float" style={{ animationDelay: "0.5s" }}>&#127799;</span>
        <span className="animate-float" style={{ animationDelay: "1s" }}>&#127804;</span>
        <span className="animate-float" style={{ animationDelay: "1.5s" }}>&#127800;</span>
        <span className="animate-float" style={{ animationDelay: "2s" }}>&#127803;</span>
      </div>
    </div>
  );
}

// --- House screen ---
function HouseScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const rooms = [
    { screen: "kitchen" as Screen, emoji: "&#129379;", label: "Kitchen", subtitle: "Cook yummy food!", color: "#FF6B6B", gradient: "linear-gradient(135deg, #FF6B6B, #ee5a24)" },
    { screen: "playroom" as Screen, emoji: "&#129513;", label: "Playroom", subtitle: "Play with toys!", color: "#4ECDC4", gradient: "linear-gradient(135deg, #4ECDC4, #44bd9e)" },
    { screen: "bedroom" as Screen, emoji: "&#128716;", label: "Bedroom", subtitle: "Cozy and fun!", color: "#A29BFE", gradient: "linear-gradient(135deg, #A29BFE, #6c5ce7)" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6"
      style={{
        background: "linear-gradient(180deg, #FFECD2 0%, #FCB69F 100%)",
      }}
    >
      <h1
        className="text-4xl font-black mt-4 mb-2 text-center"
        style={{ color: "#e17055" }}
      >
        &#127968; Avery&apos;s House
      </h1>
      <p className="text-xl font-bold mb-8 text-center" style={{ color: "#d63031" }}>
        Pick a room to explore!
      </p>

      <div className="flex flex-col gap-6 w-full max-w-md">
        {rooms.map((room, i) => (
          <button
            key={room.screen}
            className="room-btn animate-slide-up w-full"
            style={{
              background: room.gradient,
              color: "#fff",
              animationDelay: `${i * 0.15}s`,
              animationFillMode: "both",
              flexDirection: "row",
              gap: 16,
              justifyContent: "flex-start",
              paddingLeft: 24,
            }}
            onClick={() => onNavigate(room.screen)}
          >
            <span className="text-5xl" dangerouslySetInnerHTML={{ __html: room.emoji }} />
            <div className="text-left">
              <div className="text-2xl">{room.label}</div>
              <div className="text-base font-semibold opacity-90">{room.subtitle}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Kitchen screen ---
function KitchenScreen({ onNavigate, onBack }: { onNavigate: (screen: Screen) => void; onBack: () => void }) {
  const activities = [
    { screen: "pizza" as Screen, emoji: "&#127829;", label: "Make Pizza", color: "#e74c3c", gradient: "linear-gradient(135deg, #e74c3c, #c0392b)" },
    { screen: "icecream" as Screen, emoji: "&#127846;", label: "Make Ice Cream", color: "#3498db", gradient: "linear-gradient(135deg, #74b9ff, #0984e3)" },
    { screen: "soup" as Screen, emoji: "&#127858;", label: "Make Soup", color: "#27ae60", gradient: "linear-gradient(135deg, #55efc4, #00b894)" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 pt-20"
      style={{ background: "linear-gradient(180deg, #fff5e6 0%, #ffe0b2 100%)" }}
    >
      <BackButton onClick={onBack} color="#e74c3c" />
      <h1 className="text-4xl font-black mb-2" style={{ color: "#e74c3c" }}>
        &#129379; Kitchen
      </h1>
      <p className="text-xl font-bold mb-8" style={{ color: "#d35400" }}>
        What should we cook?
      </p>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        {activities.map((a, i) => (
          <button
            key={a.screen}
            className="room-btn animate-slide-up w-full"
            style={{
              background: a.gradient,
              color: "#fff",
              animationDelay: `${i * 0.15}s`,
              animationFillMode: "both",
            }}
            onClick={() => onNavigate(a.screen)}
          >
            <span className="text-5xl" dangerouslySetInnerHTML={{ __html: a.emoji }} />
            <div className="text-2xl">{a.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Pizza Making ---
function PizzaScreen({ onBack, onEarnStar }: { onBack: () => void; onEarnStar: () => void }) {
  const [step, setStep] = useState(0);
  const [toppings, setToppings] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [baking, setBaking] = useState(false);

  const toppingOptions = [
    { emoji: "&#129472;", name: "Cheese", color: "#ffeaa7" },
    { emoji: "&#127813;", name: "Tomato", color: "#ff7675" },
    { emoji: "&#127812;", name: "Mushroom", color: "#dfe6e9" },
    { emoji: "&#129361;", name: "Pepper", color: "#00b894" },
    { emoji: "&#127814;", name: "Olive", color: "#2d3436" },
    { emoji: "&#129385;", name: "Pepperoni", color: "#d63031" },
  ];

  const toggleTopping = (name: string) => {
    setToppings((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const bakeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (bakeTimerRef.current) clearTimeout(bakeTimerRef.current); };
  }, []);

  const bake = () => {
    setBaking(true);
    bakeTimerRef.current = setTimeout(() => {
      bakeTimerRef.current = null;
      setBaking(false);
      setStep(3);
      onEarnStar();
      setShowCelebration(true);
    }, 2500);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 pt-20"
      style={{ background: "linear-gradient(180deg, #fff5f5 0%, #ffe8e8 100%)" }}
    >
      <BackButton onClick={onBack} color="#e74c3c" />

      {showCelebration && (
        <Celebration
          message="You made a yummy pizza! &#127829;"
          onDone={() => { setShowCelebration(false); setStep(0); setToppings([]); }}
        />
      )}

      <h1 className="text-3xl font-black mb-2" style={{ color: "#e74c3c" }}>
        &#127829; Make a Pizza!
      </h1>

      {/* Step indicators */}
      <div className="flex gap-3 mb-6">
        {["Dough", "Toppings", "Bake"].map((s, i) => (
          <div
            key={s}
            className="px-4 py-2 rounded-full font-bold text-sm"
            style={{
              background: i <= step ? "#e74c3c" : "#ffd5d5",
              color: i <= step ? "#fff" : "#e74c3c",
            }}
          >
            {i + 1}. {s}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="animate-bounce-in text-center">
          <p className="text-xl font-bold mb-6" style={{ color: "#d63031" }}>
            First, let&apos;s make the dough! Tap the dough!
          </p>
          <button
            className="game-btn mx-auto"
            style={{ background: "#ffeaa7", minWidth: 180, minHeight: 180, borderRadius: "50%" }}
            onClick={() => setStep(1)}
          >
            <span className="text-7xl animate-wiggle">&#129360;</span>
            <span className="text-lg font-bold" style={{ color: "#6c5ce7" }}>Dough!</span>
          </button>
          <p className="mt-4 text-lg font-semibold" style={{ color: "#636e72" }}>
            This is a &#11044; <strong>CIRCLE</strong>!
          </p>
        </div>
      )}

      {step === 1 && (
        <div className="animate-bounce-in text-center w-full max-w-md">
          <p className="text-xl font-bold mb-4" style={{ color: "#d63031" }}>
            Pick your toppings! (Tap to add)
          </p>

          {/* Pizza visual */}
          <div
            className="mx-auto mb-4 rounded-full flex flex-wrap items-center justify-center gap-1 p-4"
            style={{
              width: 180,
              height: 180,
              background: "linear-gradient(135deg, #ffeaa7, #fdcb6e)",
              border: "8px solid #e17055",
            }}
          >
            {toppings.map((t, i) => {
              const opt = toppingOptions.find((o) => o.name === t);
              return (
                <span key={i} className="text-2xl animate-pop" dangerouslySetInnerHTML={{ __html: opt?.emoji || "" }} />
              );
            })}
            {toppings.length === 0 && (
              <span className="text-lg font-bold" style={{ color: "#e17055" }}>
                Empty pizza!
              </span>
            )}
          </div>

          <p className="font-bold text-lg mb-3" style={{ color: "#6c5ce7" }}>
            You added <span style={{ color: "#e74c3c", fontSize: "1.4rem" }}>{toppings.length}</span> topping{toppings.length !== 1 ? "s" : ""}!
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {toppingOptions.map((t) => (
              <button
                key={t.name}
                className={`ingredient-btn ${toppings.includes(t.name) ? "selected" : ""}`}
                style={{ background: toppings.includes(t.name) ? t.color : "#fff" }}
                onClick={() => toggleTopping(t.name)}
              >
                <span className="text-3xl" dangerouslySetInnerHTML={{ __html: t.emoji }} />
                <span className="text-xs">{t.name}</span>
              </button>
            ))}
          </div>

          <button
            className="game-btn mx-auto"
            style={{ background: "#e74c3c", color: "#fff", minWidth: 200 }}
            onClick={() => setStep(2)}
          >
            <span className="text-2xl">&#10004;&#65039;</span>
            Done picking!
          </button>
        </div>
      )}

      {step === 2 && !baking && (
        <div className="animate-bounce-in text-center">
          <p className="text-xl font-bold mb-6" style={{ color: "#d63031" }}>
            Time to bake! Put it in the oven!
          </p>
          <div className="text-8xl mb-4">&#128293;</div>
          <button
            className="game-btn mx-auto animate-wiggle"
            style={{ background: "#e74c3c", color: "#fff", minWidth: 200 }}
            onClick={bake}
          >
            <span className="text-3xl">&#129387;</span>
            Bake it!
          </button>
        </div>
      )}

      {step === 2 && baking && (
        <div className="text-center">
          <p className="text-xl font-bold mb-4" style={{ color: "#e74c3c" }}>
            Baking... it smells so good!
          </p>
          <div className="relative mx-auto" style={{ width: 150, height: 150 }}>
            <div className="text-8xl">&#129387;</div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-4xl animate-steam">&#9729;&#65039;</div>
            <div className="absolute top-0 left-1/3 -translate-y-6 text-3xl animate-steam" style={{ animationDelay: "0.5s" }}>&#9729;&#65039;</div>
            <div className="absolute top-0 right-1/3 -translate-y-8 text-3xl animate-steam" style={{ animationDelay: "1s" }}>&#9729;&#65039;</div>
          </div>
          <div className="mt-4 text-lg font-bold" style={{ color: "#636e72" }}>
            Wait for it...
          </div>
        </div>
      )}

      {step === 3 && !showCelebration && (
        <div className="animate-bounce-in text-center">
          <div className="text-8xl mb-4">&#127829;</div>
          <p className="text-2xl font-black" style={{ color: "#e74c3c" }}>
            Your pizza is ready!
          </p>
          <button
            className="game-btn mx-auto mt-6"
            style={{ background: "#e74c3c", color: "#fff" }}
            onClick={() => { setStep(0); setToppings([]); }}
          >
            Make another! &#127829;
          </button>
        </div>
      )}
    </div>
  );
}

// --- Ice Cream Making ---
function IceCreamScreen({ onBack, onEarnStar }: { onBack: () => void; onEarnStar: () => void }) {
  const [step, setStep] = useState(0);
  const [container, setContainer] = useState("");
  const [scoops, setScoops] = useState<string[]>([]);
  const [topping, setTopping] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  const flavors = [
    { emoji: "&#129365;", name: "Vanilla", color: "#FFEAA7" },
    { emoji: "&#127851;", name: "Chocolate", color: "#A0522D" },
    { emoji: "&#127827;", name: "Strawberry", color: "#FF6B81" },
    { emoji: "&#127826;", name: "Cherry", color: "#e74c3c" },
    { emoji: "&#129373;", name: "Blueberry", color: "#6c5ce7" },
    { emoji: "&#129389;", name: "Mint", color: "#55efc4" },
  ];

  const toppings = [
    { emoji: "&#127848;", name: "Sprinkles" },
    { emoji: "&#127850;", name: "Cherry on top" },
    { emoji: "&#127852;", name: "Chocolate sauce" },
    { emoji: "&#11088;", name: "Star sprinkles" },
  ];

  const addScoop = (name: string) => {
    if (scoops.length < 3) {
      setScoops((prev) => [...prev, name]);
    }
  };

  const finish = () => {
    onEarnStar();
    setShowCelebration(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 pt-20"
      style={{ background: "linear-gradient(180deg, #e8f8ff 0%, #b8e6ff 100%)" }}
    >
      <BackButton onClick={onBack} color="#0984e3" />

      {showCelebration && (
        <Celebration
          message="You made amazing ice cream! &#127846;"
          onDone={() => { setShowCelebration(false); setStep(0); setContainer(""); setScoops([]); setTopping(""); }}
        />
      )}

      <h1 className="text-3xl font-black mb-2" style={{ color: "#0984e3" }}>
        &#127846; Make Ice Cream!
      </h1>

      {/* Step indicators */}
      <div className="flex gap-3 mb-6">
        {["Cup/Cone", "Scoops", "Topping"].map((s, i) => (
          <div
            key={s}
            className="px-4 py-2 rounded-full font-bold text-sm"
            style={{
              background: i <= step ? "#0984e3" : "#b8e6ff",
              color: i <= step ? "#fff" : "#0984e3",
            }}
          >
            {i + 1}. {s}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="animate-bounce-in text-center">
          <p className="text-xl font-bold mb-6" style={{ color: "#0984e3" }}>
            Pick a cup or cone!
          </p>
          <div className="flex gap-6 justify-center">
            <button
              className="game-btn"
              style={{ background: "#ffeaa7", minWidth: 130, minHeight: 130 }}
              onClick={() => { setContainer("cone"); setStep(1); }}
            >
              <span className="text-6xl">&#127846;</span>
              <span className="font-bold">Cone</span>
            </button>
            <button
              className="game-btn"
              style={{ background: "#dfe6e9", minWidth: 130, minHeight: 130 }}
              onClick={() => { setContainer("cup"); setStep(1); }}
            >
              <span className="text-6xl">&#129378;</span>
              <span className="font-bold">Cup</span>
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-bounce-in text-center w-full max-w-md">
          <p className="text-xl font-bold mb-2" style={{ color: "#0984e3" }}>
            Pick your flavors! (Up to 3 scoops)
          </p>

          {/* Ice cream visual */}
          <div className="flex flex-col items-center mb-4">
            {scoops.map((s, i) => {
              const f = flavors.find((fl) => fl.name === s);
              return (
                <div
                  key={i}
                  className="animate-pop rounded-full font-bold text-sm flex items-center justify-center"
                  style={{
                    width: 70 - i * 4,
                    height: 40,
                    background: f?.color,
                    marginTop: i > 0 ? -6 : 0,
                    border: "3px solid rgba(255,255,255,0.5)",
                    zIndex: 10 - i,
                  }}
                >
                  {s}
                </div>
              );
            })}
            <div className="text-5xl">{container === "cone" ? "\u{1F366}" : "\u{1F964}"}</div>
          </div>

          <p className="font-bold text-lg mb-3" style={{ color: "#6c5ce7" }}>
            <span style={{ color: "#e74c3c", fontSize: "1.4rem" }}>{scoops.length}</span> scoop{scoops.length !== 1 ? "s" : ""}
            {scoops.length === 3 && " - That's the most!"}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {flavors.map((f) => (
              <button
                key={f.name}
                className="ingredient-btn"
                style={{ background: f.color + "80" }}
                onClick={() => addScoop(f.name)}
              >
                <span className="text-3xl" dangerouslySetInnerHTML={{ __html: f.emoji }} />
                <span className="text-xs font-bold">{f.name}</span>
              </button>
            ))}
          </div>

          {scoops.length > 0 && (
            <button
              className="game-btn mx-auto"
              style={{ background: "#0984e3", color: "#fff", minWidth: 200 }}
              onClick={() => setStep(2)}
            >
              <span className="text-2xl">&#10004;&#65039;</span>
              Add topping!
            </button>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="animate-bounce-in text-center w-full max-w-md">
          <p className="text-xl font-bold mb-4" style={{ color: "#0984e3" }}>
            Pick a yummy topping!
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {toppings.map((t) => (
              <button
                key={t.name}
                className={`ingredient-btn ${topping === t.name ? "selected" : ""}`}
                style={{ background: topping === t.name ? "#74b9ff" : "#fff", minHeight: 80 }}
                onClick={() => setTopping(t.name)}
              >
                <span className="text-3xl" dangerouslySetInnerHTML={{ __html: t.emoji }} />
                <span className="text-sm font-bold">{t.name}</span>
              </button>
            ))}
          </div>

          <button
            className="game-btn mx-auto"
            style={{ background: "#0984e3", color: "#fff", minWidth: 200 }}
            onClick={finish}
          >
            <span className="text-3xl">&#127846;</span>
            All done!
          </button>
        </div>
      )}
    </div>
  );
}

// --- Soup Making ---
function SoupScreen({ onBack, onEarnStar }: { onBack: () => void; onEarnStar: () => void }) {
  const [vegetables, setVegetables] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [stirring, setStirring] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const veggieOptions = [
    { emoji: "&#129365;", name: "Potato", color: "#DFE6E9", fact: "Potatoes grow underground!" },
    { emoji: "&#129387;", name: "Carrot", color: "#FF9F43", fact: "Carrots are ORANGE!" },
    { emoji: "&#129385;", name: "Broccoli", color: "#00B894", fact: "Broccoli looks like little trees!" },
    { emoji: "&#129370;", name: "Onion", color: "#FFEAA7", fact: "Onions can make you cry!" },
    { emoji: "&#127805;", name: "Corn", color: "#FDCB6E", fact: "Corn is YELLOW!" },
    { emoji: "&#129388;", name: "Peas", color: "#55EFC4", fact: "Peas are little and GREEN!" },
  ];

  const toggleVeggie = (name: string) => {
    setVegetables((prev) =>
      prev.includes(name) ? prev.filter((v) => v !== name) : [...prev, name]
    );
  };

  const stirTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (stirTimerRef.current) clearTimeout(stirTimerRef.current); };
  }, []);

  const stir = () => {
    setStirring(true);
    stirTimerRef.current = setTimeout(() => {
      stirTimerRef.current = null;
      setStirring(false);
      setStep(2);
      onEarnStar();
      setShowCelebration(true);
    }, 3000);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 pt-20"
      style={{ background: "linear-gradient(180deg, #f0fff0 0%, #c8f7c5 100%)" }}
    >
      <BackButton onClick={onBack} color="#00b894" />

      {showCelebration && (
        <Celebration
          message="Your soup is delicious! &#127858;"
          onDone={() => { setShowCelebration(false); setStep(0); setVegetables([]); }}
        />
      )}

      <h1 className="text-3xl font-black mb-2" style={{ color: "#00b894" }}>
        &#127858; Make Soup!
      </h1>

      {step === 0 && (
        <div className="animate-bounce-in text-center w-full max-w-md">
          <p className="text-xl font-bold mb-4" style={{ color: "#00b894" }}>
            Pick vegetables for your soup!
          </p>

          {/* Pot visual */}
          <div
            className="mx-auto mb-4 rounded-b-full flex flex-wrap items-end justify-center gap-1 p-4 relative"
            style={{
              width: 200,
              height: 140,
              background: "linear-gradient(180deg, #b2bec3, #636e72)",
              borderRadius: "0 0 100px 100px",
              border: "6px solid #2d3436",
              borderTop: "10px solid #2d3436",
            }}
          >
            {vegetables.map((v, i) => {
              const opt = veggieOptions.find((o) => o.name === v);
              return (
                <span key={i} className="text-2xl animate-pop" dangerouslySetInnerHTML={{ __html: opt?.emoji || "" }} />
              );
            })}
            {vegetables.length === 0 && (
              <span className="text-sm font-bold text-white">Empty pot!</span>
            )}
          </div>

          <p className="font-bold text-lg mb-3" style={{ color: "#6c5ce7" }}>
            <span style={{ color: "#e74c3c", fontSize: "1.4rem" }}>{vegetables.length}</span> vegetable{vegetables.length !== 1 ? "s" : ""} in the pot!
          </p>

          {/* Show fun fact */}
          {vegetables.length > 0 && (
            <p className="text-base font-semibold mb-3 px-4 py-2 bg-white rounded-xl" style={{ color: "#00b894" }}>
              &#128161; {veggieOptions.find((o) => o.name === vegetables[vegetables.length - 1])?.fact}
            </p>
          )}

          <div className="grid grid-cols-3 gap-3 mb-6">
            {veggieOptions.map((v) => (
              <button
                key={v.name}
                className={`ingredient-btn ${vegetables.includes(v.name) ? "selected" : ""}`}
                style={{ background: vegetables.includes(v.name) ? v.color : "#fff" }}
                onClick={() => toggleVeggie(v.name)}
              >
                <span className="text-3xl" dangerouslySetInnerHTML={{ __html: v.emoji }} />
                <span className="text-xs font-bold">{v.name}</span>
              </button>
            ))}
          </div>

          {vegetables.length > 0 && (
            <button
              className="game-btn mx-auto"
              style={{ background: "#00b894", color: "#fff", minWidth: 200 }}
              onClick={() => setStep(1)}
            >
              <span className="text-2xl">&#129379;</span>
              Time to cook!
            </button>
          )}
        </div>
      )}

      {step === 1 && !stirring && (
        <div className="animate-bounce-in text-center">
          <p className="text-xl font-bold mb-6" style={{ color: "#00b894" }}>
            Stir the soup! Tap the spoon!
          </p>
          <button
            className="game-btn mx-auto animate-wiggle"
            style={{ background: "#00b894", color: "#fff", minWidth: 160, minHeight: 160, borderRadius: "50%" }}
            onClick={stir}
          >
            <span className="text-6xl">&#129348;</span>
            <span>Stir!</span>
          </button>
        </div>
      )}

      {step === 1 && stirring && (
        <div className="text-center">
          <p className="text-xl font-bold mb-4" style={{ color: "#00b894" }}>
            Stirring the soup...
          </p>
          <div className="relative mx-auto" style={{ width: 180, height: 180 }}>
            <div
              className="rounded-b-full flex items-center justify-center"
              style={{
                width: 180,
                height: 130,
                background: "linear-gradient(180deg, #b2bec3, #636e72)",
                borderRadius: "0 0 90px 90px",
                border: "6px solid #2d3436",
                borderTop: "10px solid #2d3436",
              }}
            >
              <span className="text-4xl animate-stir">&#129348;</span>
            </div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl animate-steam">&#9729;&#65039;</div>
            <div className="absolute -top-8 left-1/3 text-2xl animate-steam" style={{ animationDelay: "0.7s" }}>&#9729;&#65039;</div>
          </div>
          <p className="mt-4 text-lg font-bold" style={{ color: "#636e72" }}>
            Mmm, smells great!
          </p>
        </div>
      )}

      {step === 2 && !showCelebration && (
        <div className="animate-bounce-in text-center">
          <div className="text-8xl mb-4">&#127858;</div>
          <p className="text-2xl font-black" style={{ color: "#00b894" }}>
            Your soup is ready! Yummy!
          </p>
          <button
            className="game-btn mx-auto mt-6"
            style={{ background: "#00b894", color: "#fff" }}
            onClick={() => { setStep(0); setVegetables([]); }}
          >
            Make more soup! &#127858;
          </button>
        </div>
      )}
    </div>
  );
}

// --- Playroom screen ---
function PlayroomScreen({ onNavigate, onBack }: { onNavigate: (screen: Screen) => void; onBack: () => void }) {
  const activities = [
    { screen: "shapes" as Screen, emoji: "&#128316;", label: "Shape Sorter", color: "#6c5ce7", gradient: "linear-gradient(135deg, #a29bfe, #6c5ce7)" },
    { screen: "colors" as Screen, emoji: "&#127912;", label: "Color Match", color: "#fdcb6e", gradient: "linear-gradient(135deg, #ffeaa7, #fdcb6e)" },
    { screen: "blocks" as Screen, emoji: "&#129518;", label: "Build Blocks", color: "#e17055", gradient: "linear-gradient(135deg, #fab1a0, #e17055)" },
    { screen: "teaparty" as Screen, emoji: "&#129513;", label: "Tea Party", color: "#fd79a8", gradient: "linear-gradient(135deg, #fd79a8, #e84393)" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 pt-20"
      style={{ background: "linear-gradient(180deg, #e8f5e8 0%, #c8e6c9 100%)" }}
    >
      <BackButton onClick={onBack} color="#4ECDC4" />
      <h1 className="text-4xl font-black mb-2" style={{ color: "#4ECDC4" }}>
        &#129513; Playroom
      </h1>
      <p className="text-xl font-bold mb-8" style={{ color: "#00b894" }}>
        What do you want to play?
      </p>

      <div className="grid grid-cols-2 gap-5 w-full max-w-sm">
        {activities.map((a, i) => (
          <button
            key={a.screen}
            className="room-btn animate-slide-up"
            style={{
              background: a.gradient,
              color: "#fff",
              animationDelay: `${i * 0.1}s`,
              animationFillMode: "both",
              minWidth: 0,
              width: "100%",
            }}
            onClick={() => onNavigate(a.screen)}
          >
            <span className="text-4xl" dangerouslySetInnerHTML={{ __html: a.emoji }} />
            <div className="text-lg">{a.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Shape Sorter ---
function ShapesScreen({ onBack, onEarnStar }: { onBack: () => void; onEarnStar: () => void }) {
  const shapes = [
    { name: "Circle", emoji: "&#128308;", color: "#e74c3c" },
    { name: "Square", emoji: "&#128998;", color: "#0984e3" },
    { name: "Triangle", emoji: "&#128316;", color: "#fdcb6e" },
    { name: "Star", emoji: "&#11088;", color: "#f1c40f" },
    { name: "Heart", emoji: "&#10084;&#65039;", color: "#e84393" },
    { name: "Diamond", emoji: "&#128167;", color: "#00b894" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [matched, setMatched] = useState<number[]>([]);
  const [showWrong, setShowWrong] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentShape = shapes[currentIndex];

  const handleGuess = (index: number) => {
    if (matched.includes(index)) return;
    if (index === currentIndex) {
      const newMatched = [...matched, index];
      setMatched(newMatched);
      if (newMatched.length === shapes.length) {
        onEarnStar();
        setShowCelebration(true);
      } else {
        let next = currentIndex + 1;
        while (newMatched.includes(next) && next < shapes.length) next++;
        if (next >= shapes.length) {
          for (let i = 0; i < shapes.length; i++) {
            if (!newMatched.includes(i)) { next = i; break; }
          }
        }
        setCurrentIndex(next);
      }
    } else {
      setShowWrong(true);
      setTimeout(() => setShowWrong(false), 800);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 pt-20"
      style={{ background: "linear-gradient(180deg, #f3e8ff 0%, #ddd6fe 100%)" }}
    >
      <BackButton onClick={onBack} color="#6c5ce7" />

      {showCelebration && (
        <Celebration
          message="You matched all the shapes! &#128316;"
          onDone={() => { setShowCelebration(false); setMatched([]); setCurrentIndex(0); }}
        />
      )}

      <h1 className="text-3xl font-black mb-2" style={{ color: "#6c5ce7" }}>
        &#128316; Shape Sorter
      </h1>

      <p className="text-lg font-bold mb-2" style={{ color: "#636e72" }}>
        {matched.length} of {shapes.length} matched!
      </p>

      {!showCelebration && (
        <>
          <div className="animate-bounce-in text-center mb-6">
            <p className="text-xl font-bold mb-3" style={{ color: "#6c5ce7" }}>
              Find the <span style={{ color: currentShape.color, fontSize: "1.3rem" }}>{currentShape.name}</span>!
            </p>
            <div className="text-7xl animate-wiggle" dangerouslySetInnerHTML={{ __html: currentShape.emoji }} />
          </div>

          {showWrong && (
            <div className="text-xl font-bold mb-4 animate-wiggle" style={{ color: "#e74c3c" }}>
              Try again! &#128064;
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
            {shapes.map((s, i) => (
              <button
                key={s.name}
                className="game-btn"
                style={{
                  background: matched.includes(i) ? "#c8e6c9" : "#fff",
                  opacity: matched.includes(i) ? 0.5 : 1,
                  minWidth: 90,
                  minHeight: 90,
                }}
                onClick={() => handleGuess(i)}
                disabled={matched.includes(i)}
              >
                <span className="text-4xl" dangerouslySetInnerHTML={{ __html: s.emoji }} />
                <span className="text-xs font-bold" style={{ color: s.color }}>{s.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// --- Color Match ---
function ColorsScreen({ onBack, onEarnStar }: { onBack: () => void; onEarnStar: () => void }) {
  const colors = [
    { name: "Red", hex: "#e74c3c", emoji: "&#128997;" },
    { name: "Blue", hex: "#3498db", emoji: "&#128998;" },
    { name: "Yellow", hex: "#f1c40f", emoji: "&#128999;" },
    { name: "Green", hex: "#2ecc71", emoji: "&#129001;" },
    { name: "Purple", hex: "#9b59b6", emoji: "&#128995;" },
    { name: "Orange", hex: "#e67e22", emoji: "&#129648;" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showWrong, setShowWrong] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const shuffle = () => {
    const indices = [0, 1, 2, 3, 4, 5];
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  };

  const [shuffled, setShuffled] = useState<number[]>(() => shuffle());

  useEffect(() => {
    if (score > 0) setShuffled(shuffle());
  }, [score]);

  const currentColor = colors[currentIndex % colors.length];

  const handleGuess = (colorIndex: number) => {
    if (colorIndex === currentIndex % colors.length) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= 6) {
        onEarnStar();
        setShowCelebration(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else {
      setShowWrong(true);
      setTimeout(() => setShowWrong(false), 800);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 pt-20"
      style={{ background: "linear-gradient(180deg, #fff9e6 0%, #ffe8a1 100%)" }}
    >
      <BackButton onClick={onBack} color="#fdcb6e" />

      {showCelebration && (
        <Celebration
          message="You know all your colors! &#127912;"
          onDone={() => { setShowCelebration(false); setScore(0); setCurrentIndex(0); setShuffled(shuffle()); }}
        />
      )}

      <h1 className="text-3xl font-black mb-2" style={{ color: "#f39c12" }}>
        &#127912; Color Match
      </h1>

      <p className="text-lg font-bold mb-2" style={{ color: "#636e72" }}>
        {score} of 6 colors found!
      </p>

      {!showCelebration && (
        <>
          <div className="animate-bounce-in text-center mb-6">
            <p className="text-xl font-bold mb-3" style={{ color: "#2d3436" }}>
              Tap the <span style={{ color: currentColor.hex, fontSize: "1.5rem", fontWeight: 900 }}>{currentColor.name}</span> one!
            </p>
            <div
              className="mx-auto rounded-full animate-float"
              style={{
                width: 100,
                height: 100,
                background: currentColor.hex,
                border: "5px solid rgba(255,255,255,0.7)",
                boxShadow: `0 4px 15px ${currentColor.hex}40`,
              }}
            />
          </div>

          {showWrong && (
            <div className="text-xl font-bold mb-3 animate-wiggle" style={{ color: "#e74c3c" }}>
              Not that one! Try again! &#128064;
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
            {shuffled.map((ci) => {
              const c = colors[ci];
              return (
                <button
                  key={c.name}
                  className="game-btn"
                  style={{
                    background: c.hex,
                    minWidth: 90,
                    minHeight: 90,
                    border: "4px solid rgba(255,255,255,0.5)",
                  }}
                  onClick={() => handleGuess(ci)}
                >
                  <span className="text-3xl" dangerouslySetInnerHTML={{ __html: c.emoji }} />
                  <span className="text-white text-sm font-black" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
                    {c.name}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// --- Building Blocks ---
function BlocksScreen({ onBack, onEarnStar }: { onBack: () => void; onEarnStar: () => void }) {
  const blockColors = ["#e74c3c", "#3498db", "#f1c40f", "#2ecc71", "#9b59b6", "#e67e22", "#1abc9c", "#fd79a8"];
  const [tower, setTower] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const addBlock = (color: string) => {
    const newTower = [...tower, color];
    setTower(newTower);
    if (newTower.length >= 8) {
      onEarnStar();
      setShowCelebration(true);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 pt-20"
      style={{ background: "linear-gradient(180deg, #fff0f0 0%, #ffd0d0 100%)" }}
    >
      <BackButton onClick={onBack} color="#e17055" />

      {showCelebration && (
        <Celebration
          message="Amazing tower! So tall! &#127975;"
          onDone={() => { setShowCelebration(false); setTower([]); }}
        />
      )}

      <h1 className="text-3xl font-black mb-2" style={{ color: "#e17055" }}>
        &#129518; Build a Tower!
      </h1>

      <p className="text-lg font-bold mb-2" style={{ color: "#636e72" }}>
        {tower.length} blocks high! {tower.length >= 5 ? "WOW!" : "Keep going!"}
      </p>

      {/* Tower visual */}
      <div className="flex flex-col-reverse items-center mb-6 min-h-48">
        {tower.map((color, i) => (
          <div
            key={i}
            className="animate-pop rounded-lg"
            style={{
              width: 80 + (tower.length - i) * 4,
              height: 30,
              background: color,
              border: "3px solid rgba(255,255,255,0.5)",
              marginTop: i > 0 ? 2 : 0,
            }}
          />
        ))}
        {tower.length === 0 && (
          <p className="text-lg font-bold" style={{ color: "#b2bec3" }}>
            Tap a color to start building!
          </p>
        )}
      </div>

      {/* Color buttons */}
      <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
        {blockColors.map((color) => (
          <button
            key={color}
            className="game-btn"
            style={{
              background: color,
              minWidth: 65,
              minHeight: 65,
              border: "4px solid rgba(255,255,255,0.5)",
            }}
            onClick={() => addBlock(color)}
          />
        ))}
      </div>

      {tower.length > 0 && (
        <button
          className="game-btn mt-6"
          style={{ background: "#b2bec3", color: "#fff" }}
          onClick={() => setTower([])}
        >
          Start Over &#128260;
        </button>
      )}
    </div>
  );
}

// --- Tea Party ---
function TeaPartyScreen({ onBack, onEarnStar }: { onBack: () => void; onEarnStar: () => void }) {
  const friends = [
    { name: "Bear", emoji: "&#128059;", drink: "" },
    { name: "Bunny", emoji: "&#128048;", drink: "" },
    { name: "Kitty", emoji: "&#128049;", drink: "" },
    { name: "Puppy", emoji: "&#128054;", drink: "" },
  ];

  const drinks = [
    { name: "Tea", emoji: "&#9749;" },
    { name: "Juice", emoji: "&#129380;" },
    { name: "Milk", emoji: "&#129371;" },
    { name: "Water", emoji: "&#128167;" },
  ];

  const [served, setServed] = useState<Record<string, string>>({});
  const [selectedDrink, setSelectedDrink] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  const serveFriend = (friendName: string) => {
    if (!selectedDrink) return;
    const newServed = { ...served, [friendName]: selectedDrink };
    setServed(newServed);
    if (Object.keys(newServed).length === friends.length) {
      onEarnStar();
      setShowCelebration(true);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 pt-20"
      style={{ background: "linear-gradient(180deg, #fce4ec 0%, #f8bbd0 100%)" }}
    >
      <BackButton onClick={onBack} color="#e84393" />

      {showCelebration && (
        <Celebration
          message="Everyone loved the tea party! &#129513;"
          onDone={() => { setShowCelebration(false); setServed({}); setSelectedDrink(""); }}
        />
      )}

      <h1 className="text-3xl font-black mb-2" style={{ color: "#e84393" }}>
        &#129513; Tea Party!
      </h1>

      <p className="text-lg font-bold mb-4" style={{ color: "#636e72" }}>
        {selectedDrink ? `Serving ${selectedDrink}! Tap a friend!` : "Pick a drink first!"}
      </p>

      {/* Drink selection */}
      <div className="flex gap-3 mb-6">
        {drinks.map((d) => (
          <button
            key={d.name}
            className={`ingredient-btn ${selectedDrink === d.name ? "selected" : ""}`}
            style={{ background: selectedDrink === d.name ? "#fd79a8" : "#fff" }}
            onClick={() => setSelectedDrink(d.name)}
          >
            <span className="text-3xl" dangerouslySetInnerHTML={{ __html: d.emoji }} />
            <span className="text-xs font-bold">{d.name}</span>
          </button>
        ))}
      </div>

      {/* Friends */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {friends.map((f) => {
          const isServed = !!served[f.name];
          return (
            <button
              key={f.name}
              className="game-btn"
              style={{
                background: isServed ? "#c8e6c9" : "#fff",
                minHeight: 120,
              }}
              onClick={() => serveFriend(f.name)}
              disabled={isServed}
            >
              <span className="text-5xl" dangerouslySetInnerHTML={{ __html: f.emoji }} />
              <span className="text-sm font-bold">{f.name}</span>
              {isServed && (
                <span className="text-lg">
                  {drinks.find((d) => d.name === served[f.name])?.emoji && (
                    <span dangerouslySetInnerHTML={{ __html: drinks.find((d) => d.name === served[f.name])?.emoji || "" }} />
                  )}{" "}
                  &#9989;
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Bedroom screen ---
function BedroomScreen({ onBack, onEarnStar }: { onBack: () => void; onEarnStar: () => void }) {
  const items = [
    { name: "Teddy Bear", emoji: "&#128059;&#8205;&#10052;&#65039;", spot: "bed" },
    { name: "Book", emoji: "&#128218;", spot: "shelf" },
    { name: "Lamp", emoji: "&#128161;", spot: "table" },
    { name: "Blanket", emoji: "&#129507;", spot: "bed" },
    { name: "Pillow", emoji: "&#128716;", spot: "bed" },
    { name: "Clock", emoji: "&#9200;", spot: "wall" },
  ];

  const [placed, setPlaced] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const placeItem = (name: string) => {
    if (placed.includes(name)) return;
    const newPlaced = [...placed, name];
    setPlaced(newPlaced);
    if (newPlaced.length === items.length) {
      onEarnStar();
      setShowCelebration(true);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 pt-20"
      style={{ background: "linear-gradient(180deg, #ede7f6 0%, #d1c4e9 100%)" }}
    >
      <BackButton onClick={onBack} color="#7c4dff" />

      {showCelebration && (
        <Celebration
          message="The bedroom looks perfect! &#128716;"
          onDone={() => { setShowCelebration(false); setPlaced([]); }}
        />
      )}

      <h1 className="text-3xl font-black mb-2" style={{ color: "#7c4dff" }}>
        &#128716; Bedroom
      </h1>
      <p className="text-xl font-bold mb-2" style={{ color: "#7c4dff" }}>
        Put everything in its place!
      </p>
      <p className="text-lg font-bold mb-6" style={{ color: "#636e72" }}>
        {placed.length} of {items.length} items placed!
      </p>

      {/* Room visual */}
      <div
        className="w-full max-w-sm rounded-2xl p-4 mb-6 flex flex-wrap gap-3 items-center justify-center min-h-32"
        style={{ background: "rgba(255,255,255,0.6)", border: "4px dashed #b39ddb" }}
      >
        {placed.length === 0 && (
          <p className="text-base font-bold" style={{ color: "#b39ddb" }}>
            Tap items below to decorate!
          </p>
        )}
        {placed.map((name) => {
          const item = items.find((i) => i.name === name);
          return (
            <span key={name} className="text-4xl animate-pop" dangerouslySetInnerHTML={{ __html: item?.emoji || "" }} />
          );
        })}
      </div>

      {/* Items to place */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
        {items.map((item) => {
          const isPlaced = placed.includes(item.name);
          return (
            <button
              key={item.name}
              className="game-btn"
              style={{
                background: isPlaced ? "#c8e6c9" : "#fff",
                opacity: isPlaced ? 0.5 : 1,
              }}
              onClick={() => placeItem(item.name)}
              disabled={isPlaced}
            >
              <span className="text-3xl" dangerouslySetInnerHTML={{ __html: item.emoji }} />
              <span className="text-xs font-bold">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Main App ---
function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [stars, setStars] = useState(0);
  const [, setHistory] = useState<Screen[]>([]);

  const navigate = useCallback((next: Screen) => {
    setHistory((prev) => [...prev, screen]);
    setScreen(next);
  }, [screen]);

  const goBack = useCallback(() => {
    setHistory((prev) => {
      const newHistory = [...prev];
      const last = newHistory.pop();
      if (last !== undefined) {
        setScreen(last);
      }
      return newHistory;
    });
  }, []);

  const earnStar = useCallback(() => {
    setStars((prev) => prev + 1);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}>
      {screen !== "welcome" && <StarsDisplay count={stars} />}

      {screen === "welcome" && <WelcomeScreen onEnter={() => navigate("house")} />}
      {screen === "house" && <HouseScreen onNavigate={navigate} />}
      {screen === "kitchen" && <KitchenScreen onNavigate={navigate} onBack={goBack} />}
      {screen === "playroom" && <PlayroomScreen onNavigate={navigate} onBack={goBack} />}
      {screen === "bedroom" && <BedroomScreen onBack={goBack} onEarnStar={earnStar} />}
      {screen === "pizza" && <PizzaScreen onBack={goBack} onEarnStar={earnStar} />}
      {screen === "icecream" && <IceCreamScreen onBack={goBack} onEarnStar={earnStar} />}
      {screen === "soup" && <SoupScreen onBack={goBack} onEarnStar={earnStar} />}
      {screen === "shapes" && <ShapesScreen onBack={goBack} onEarnStar={earnStar} />}
      {screen === "colors" && <ColorsScreen onBack={goBack} onEarnStar={earnStar} />}
      {screen === "blocks" && <BlocksScreen onBack={goBack} onEarnStar={earnStar} />}
      {screen === "teaparty" && <TeaPartyScreen onBack={goBack} onEarnStar={earnStar} />}
    </div>
  );
}

export default App;
