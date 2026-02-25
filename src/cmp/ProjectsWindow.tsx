import { useState } from "react";
import { XPButton } from "../cmp/XPButton";
import venmate from "../assets/venmate.png";
import dreamSkin from "../assets/dreamSkin.png";
import foodi from "../assets/foodi.png";
import captchaSolver from "../assets/captcha-solver.png";
import faceDetection from "../assets/face-detection.webp";
import datasetCard from "../assets/dataset-card.png";
import travel from "../assets/travel.png";
import kauf from "../assets/kauf.png";
import asb from "../assets/asb.png";
import blog from "../assets/blog.png";
import vetOne from "../assets/vet-one.jpg";
import carpet from "../assets/carpet.jpg";
interface Project {
  img: string;
  name: string;
  des: string;
  tec: string;
  tec2?: string;
  tec3?: string;
  tec4?: string;
  url: string;
  url2: string;
}

const Data: Project[] = [
  {
    img: venmate,
    name: "Venmate",
    des: "A web-based customer success platform, Venerate, designed to enhance client management and engagement. With AI integration, it provides actionable insights, automates workflows, and optimizes customer success strategies, similar to Salesforce. Features include client tracking, real-time analytics, and personalized recommendations for improved outcomes",
    tec: "React",
    tec2: "React Query",
    tec3: "Tailwind",
    tec4: "typescript",
    url: "https://www.venmate.net",
    url2: "",
  },
  {
    img: dreamSkin,
    name: "Dream Skin",
    des: "An e-commerce site for a laser shop with a sleek interface and TailAdmin Dashboard for managing inventory, sales, and orders. Features include a product catalog, secure checkout, and real-time analytics.",
    tec: "NextJS",
    tec2: "Prisma",
    tec3: "Tailwind",
    url: "https://www.dreamskin-germany.de/de",
    url2: "",
  },
  {
    img: foodi,
    name: "FooDi",
    des: "I've revamped pizza ordering using Three.js for immersive visuals, a microservices architecture for efficiency, and a 3D module with GraphQL in TypeScript for real-time customization. Enjoy a seamless experience with cutting-edge technology at your fingertips!",
    tec: "Nest",
    tec2: "React",
    tec3: "GraphQL",
    tec4: "THREE.JS",
    url: "",
    url2: "https://github.com/puriyaj/3D-Fullstack-webpage",
  },
  {
    img: captchaSolver,
    name: "Captcha Solver Bot",
    des: "Building an appointment scheduling bot that uses machine learning to solve CAPTCHAs with CNNs, RNNs, and CTC, and extracts and autofills text from forms. The bot automates the entire booking process, from navigating web forms to inputting data.",
    tec: "Tensorflow",
    tec2: "Python",
    tec3: "keras",
    tec4: "selenium",
    url: "",
    url2: "https://github.com/puriyaj/reading-image-text-tensorflow/blob/main/dd/3-8.ipynb",
  },
  {
    img: faceDetection,
    name: "Face Detection",
    des: "Building a face detection web application using TensorFlow's pre-trained models and React, allowing real-time facial recognition and processing. The app integrates TensorFlow for accurate face detection and React for a dynamic, user-friendly interface.",
    tec: "Tensorflow js",
    tec2: "Python",
    tec3: "canvas",
    tec4: "React",
    url: "https://face-detection-one-brown.vercel.app/",
    url2: "https://github.com/puriyaj/face-detection/tree/master",
  },
  {
    img: datasetCard,
    name: "Food Detection",
    des: "The Food101 project leverages a CNN model to classify 101 different food categories, utilizing the EfficientNetB0 architecture for improved performance. By employing fine-tuning techniques, our model surpasses DeepFood's benchmark, demonstrating superior performance in food classification tasks.",
    tec: "Tensorflow",
    tec2: "Python",
    tec3: "Transfer learning",
    tec4: "fine tuning",
    url: "",
    url2: "https://github.com/puriyaj/Food101-Tensorflow/tree/master",
  },
  {
    img: travel,
    name: "WanderVista",
    des: "I've infused dynamic animation with Framer Motion and React for an engaging and user-friendly travel experience. Explore destinations, seamlessly navigate, and book your next adventure with ease.",
    tec: "Frontend",
    tec2: "React",
    tec3: "Framer Motion",
    url: "https://travel-app-nine-pi.vercel.app",
    url2: "https://github.com/puriyaj/Travel-app",
  },
  {
    img: kauf,
    name: "Kaufmann",
    des: "Kaufmann platform boasts three dashboards tailored for buyers, sellers, and administrators. Buyers enjoy a seamless shopping experience, sellers efficiently manage products, and admins have control with roll-based functionality.",
    tec: "Next",
    tec2: "Dynamic",
    tec3: "Fullstack",
    tec4: "RestApi",
    url: "https://kaufmann-web-app.vercel.app",
    url2: "https://github.com/puriyaj/Kaufmann_web_app",
  },
  {
    img: asb,
    name: "Asb Davani",
    des: "Asbdavani is your go-to destination for live horse competitions and the latest news in the equestrian world. With a user-friendly interface, the platform offers real-time updates on competitions.",
    tec: "Full-Stack",
    tec2: "React",
    tec3: "Nest.js",
    tec4: "SQL",
    url: "https://asbdavani.app",
    url2: "",
  },
  {
    img: blog,
    name: "MyBlog",
    des: "I've transformed the blogging experience. With user authentication, live post updates, and a database-connected comment system, our platform offers a dynamic and secure space for engaging content and discussions.",
    tec: "Prisma",
    tec2: "React",
    tec3: "Next Auth",
    tec4: "MongoDB",
    url: "https://my-blog-ten-pearl.vercel.app",
    url2: "https://github.com/puriyaj/myBlog",
  },
  {
    img: vetOne,
    name: "Vet-One",
    des: "Vet-One is where caring for your dogs is made simple. With secure user authentication and an easy appointment service, finding the right doctor for your furry friends is a breeze.",
    tec: "React",
    tec2: "Node.js",
    tec3: "Express",
    tec4: "Typescript",
    url: "https://vet-one.ir",
    url2: "",
  },
  {
    img: carpet,
    name: "Eleishe",
    des: "Eleishe is a website that sells carpets. I worked on both the design and functionality of the site, handling both the front and back ends. I also helped with making sure user accounts are secure.",
    tec: "laravel",
    tec2: "Bootstrap",
    tec3: "React",
    tec4: "MySQL",
    url: "https://eleishe.ir",
    url2: "",
  },
];


export function ProjectsWindow() {
  const [selected, setSelected] = useState<Project | null>(null);

  const tecTags = selected
    ? [selected.tec, selected.tec2, selected.tec3, selected.tec4].filter(Boolean) as string[]
    : [];

  return (
    <div className="flex h-full" style={{ fontFamily: "Tahoma, sans-serif" }}>
      {/* Large icon grid */}
      <div
        className="flex-1 p-3 overflow-auto"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
          gap: 2,
          alignContent: "start",
        }}
      >
        {Data.map((p) => {
          const isSelected = selected?.name === p.name;
          return (
            <div
              key={p.name}
              onClick={() => setSelected(p)}
              onDoubleClick={() => {
                if (p.url) window.open(p.url, "_blank");
                else if (p.url2) window.open(p.url2, "_blank");
              }}
              className="flex flex-col items-center gap-1 p-2 rounded cursor-default"
              style={{
                background: isSelected ? "rgba(49,106,197,0.25)" : "transparent",
              }}
            >
              {/* Large thumbnail image — XP large icon style */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 3,
                  overflow: "hidden",
                  border: isSelected ? "2px solid #316ac5" : "2px solid transparent",
                  boxShadow: isSelected
                    ? "0 0 0 1px #7ab3f0"
                    : "0 1px 3px rgba(0,0,0,0.35)",
                  flexShrink: 0,
                  position: "relative",
                  background: "#c0d8f0",
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: isSelected ? "brightness(0.85)" : "none",
                  }}
                  onError={(e) => {
                    // Fallback: show emoji if image fails
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              {/* Label below icon — XP style with text selection highlight */}
              <div
                className="text-center"
                style={{
                  maxWidth: 88,
                  padding: "1px 3px",
                  borderRadius: 2,
                  background: isSelected ? "#316ac5" : "transparent",
                  color: isSelected ? "white" : "#000",
                  fontSize: 11,
                  lineHeight: "1.2",
                  wordBreak: "break-word",
                  textAlign: "center",
                }}
              >
                {p.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      <div
        className="p-3 text-s overflow-auto flex-shrink-0"
        style={{
          width: 200,
          background: "linear-gradient(180deg,#7ba7e7 0%,#3d6bc9 100%)",
        }}
      >
        {selected ? (
          <>
            {/* Preview image */}
            <div
              style={{
                width: "100%",
                height: 90,
                borderRadius: 4,
                overflow: "hidden",
                marginBottom: 8,
                border: "1px solid rgba(255,255,255,0.3)",
                background: "#c0d8f0",
              }}
            >
              <img
                src={selected.img}
                alt={selected.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <p className="text-white font-bold text-sm mb-1">{selected.name}</p>
            <p className="text-blue-100 mb-3 leading-relaxed" style={{ fontSize: 12 }}>
              {selected.des}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {tecTags.map((t) => (
                <span
                  key={t}
                  className="px-1 rounded"
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontSize: 9,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              {selected.url && (
                <XPButton small onClick={() => window.open(selected.url, "_blank")}>
                  🌐 Live Site
                </XPButton>
              )}
              {selected.url2 && (
                <XPButton small onClick={() => window.open(selected.url2, "_blank")}>
                  💻 GitHub
                </XPButton>
              )}
              {!selected.url && !selected.url2 && (
                <p className="text-blue-200 text-[10px]">No links available</p>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="text-blue-200 mb-2">Select a project to view details</p>
            <p className="text-blue-300" style={{ fontSize: 10 }}>
              {Data.length} projects total
            </p>
          </>
        )}
      </div>
    </div>
  );
}
