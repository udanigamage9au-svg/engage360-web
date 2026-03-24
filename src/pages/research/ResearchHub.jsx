import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../DashboardLayout"; // adjust path if needed

// Icons
import guidanceIcon from "../../assets/guidance.png";
import ethicsIcon from "../../assets/ethics.jpg";
import councilIcon from "../../assets/council.jpg";
import opportunityIcon from "../../assets/opportunity.jpg";

function ResearchHub() {
  const navigate = useNavigate();

  const hubFeatures = [
    {
      id: "guidance",
      title: "Research Guidance",
      description:
        "Access templates, thesis writing guides, and academic style manuals.",
      icon: guidanceIcon,
      path: "/research/guidance",
      color: "#e0f2fe",
    },
    {
      id: "ethics",
      title: "Ethical Clearance",
      description:
        "Submit ethics applications and track your approval status in real-time.",
      icon: ethicsIcon,
      path: "/research/ethics",
      color: "#fef9c3",
    },
    {
      id: "council",
      title: "Research Council",
      description:
        "Connect with faculty members and explore the University Research Board.",
      icon: councilIcon,
      path: "/research/council",
      color: "#dcfce7",
    },
    {
      id: "opportunities",
      title: "Research Opportunities",
      description:
        "Find active grants, symposium calls, and student collaboration projects.",
      icon: opportunityIcon,
      path: "/research/opportunities",
      color: "#f3e8ff",
    },
  ];

  return (
    <DashboardLayout
      activePage="research"
      title="Research Hub"
      subtitle="Explore research tools and opportunities"
    >
      <div style={styles.container}>
        <div style={styles.grid}>
          {hubFeatures.map((feature) => (
            <div
              key={feature.id}
              onClick={() => navigate(feature.path)}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0,0,0,0.05)";
              }}
            >
              <div
                style={{
                  ...styles.iconWrapper,
                  backgroundColor: feature.color,
                }}
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  style={styles.iconImg}
                />
              </div>

              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardDescription}>{feature.description}</p>

              <div style={styles.actionText}>Get Started →</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ResearchHub;

//
// 🔥 STYLES (THIS FIXES YOUR ERROR)
//
const styles = {
  container: {
    padding: "20px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },
  card: {
    background: "white",
    borderRadius: "24px",
    padding: "32px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    border: "1px solid #f1f5f9",
  },
  iconWrapper: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  iconImg: {
    width: "32px",
    height: "32px",
    objectFit: "contain",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "12px",
  },
  cardDescription: {
    fontSize: "15px",
    color: "#64748b",
    lineHeight: "1.6",
    marginBottom: "24px",
  },
  actionText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#295fb8",
    marginTop: "auto",
  },
};