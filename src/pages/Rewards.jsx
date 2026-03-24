import { useState, useEffect } from "react"
import DashboardLayout from "./DashboardLayout"
import coffee from "../assets/coffee.jpg"
import bracelet from "../assets/bracelet.webp" 

function Rewards() {
  const [displayPoints, setDisplayPoints] = useState(0)
  const [streak, setStreak] = useState(0)
  const [redeemedItem, setRedeemedItem] = useState(null)
  const [voucher, setVoucher] = useState(null)

  // UPDATED COSTS: 500 and 600
  const rewardsList = [
    { id: 1, name: "Premium Coffee Voucher", cost: 500, img: coffee, desc: "Claim a free barista-made coffee at the Main Hall Café." },
    { id: 2, name: "University Hand Bracelet", cost: 600, img: bracelet, desc: "Official CINEC branded silicone hand bracelet." }
  ]

  useEffect(() => {
    const savedPoints = parseInt(localStorage.getItem("userPoints") || "1250")
    const savedStreak = parseInt(localStorage.getItem("streakCount") || "0")
    setStreak(savedStreak)

    let start = 0
    const duration = 1200 
    const increment = Math.ceil(savedPoints / (duration / 10))
    
    const timer = setInterval(() => {
      start += increment
      if (start >= savedPoints) {
        setDisplayPoints(savedPoints)
        clearInterval(timer)
      } else {
        setDisplayPoints(start)
      }
    }, 10)
    return () => clearInterval(timer)
  }, [])

  function generateVoucher(name) {
    const prefix = name.includes("Coffee") ? "COF" : "BRC"
    return `ENG-${prefix}-` + Math.floor(10000 + Math.random() * 90000)
  }

  function redeemReward(item) {
    if (displayPoints < item.cost) {
      alert("Not enough points!")
      return
    }
    const voucherCode = generateVoucher(item.name)
    const newTotal = displayPoints - item.cost
    
    setVoucher(voucherCode)
    setRedeemedItem(item.id)
    setDisplayPoints(newTotal)
    localStorage.setItem("userPoints", newTotal)
  }

  return (
    <DashboardLayout activePage="rewards" title="Student Rewards" subtitle="Redeem your points and track your consistency.">
      <div style={styles.container}>
        
        <div style={styles.heroGrid}>
            {/* ✨ GLOWING POINTS CARD RE-IMPLEMENTED */}
            <div style={styles.glassPointsCard}>
                <div style={styles.pointsHeader}>
                    <div style={styles.trophyWrapper}>
                        <span style={styles.trophyIcon}>🏆</span>
                        <div style={styles.trophyGlow} />
                    </div>
                    <div>
                        <p style={styles.label}>Total Balance</p>
                        <h1 style={styles.pointsDisplay}>
                            {displayPoints.toLocaleString()} <span style={styles.ptsText}>PTS</span>
                        </h1>
                    </div>
                </div>

                <div style={styles.progressContainer}>
                    <div style={styles.progressBar}>
                        <div 
                          style={{
                            ...styles.progressFill, 
                            width: `${Math.min((displayPoints / 2000) * 100, 100)}%`
                          }} 
                        />
                        <div 
                          style={{
                            ...styles.progressIndicatorGlow, 
                            left: `${Math.min((displayPoints / 2000) * 100, 100)}%`
                          }} 
                        />
                    </div>
                    <div style={styles.tierLabels}>
                        <span>Bronze</span>
                        <span style={{color: displayPoints >= 1000 ? '#3b82f6' : '#475569'}}>Silver</span>
                        <span>Gold</span>
                    </div>
                </div>
            </div>

            {/* STREAK CARD */}
            <div style={styles.streakBadgeCard}>
                <div style={styles.streakHeaderInfo}>
                    <span style={styles.fireIcon}>🔥</span>
                    <div>
                        <h2 style={styles.streakCount}>{streak} Days</h2>
                        <p style={styles.streakSub}>Active Streak</p>
                    </div>
                </div>
                
                <div style={styles.badgeProgressBox}>
                    <div style={styles.badgeIcon}>🏅</div>
                    <div style={{flex: 1}}>
                        <p style={styles.badgeName}>Consistent Explorer Badge</p>
                        <div style={styles.badgeBarOuter}>
                            <div style={{...styles.badgeBarInner, width: `${Math.min((streak / 7) * 100, 100)}%`}} />
                        </div>
                        <p style={styles.badgeGoal}>
                            {streak >= 7 ? "Badge Unlocked! ✓" : `${7 - streak} days until your badge`}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div style={styles.contentGrid}>
          <div style={styles.activitySection}>
            <h3 style={styles.sectionTitle}>Daily Progress</h3>
            <div style={styles.activityList}>
              <div style={styles.activityItem}>
                <span>📍 Facility Check-In</span>
                <span style={styles.ptsGain}>+1 pt</span>
              </div>
              <div style={styles.activityItem}>
                <span>📚 Room Booking</span>
                <span style={styles.ptsGain}>+1 pt</span>
              </div>
            </div>
          </div>

          <div style={styles.rewardSection}>
            <h3 style={styles.sectionTitle}>Available Perks</h3>
            <div style={styles.rewardsScroll}>
              {rewardsList.map(item => (
                <div key={item.id} style={styles.rewardCard}>
                  <div style={styles.imgWrapper}>
                    <img src={item.img} style={styles.rewardImg} alt={item.name} />
                    <div style={styles.costBadge}>{item.cost} PTS</div>
                  </div>
                  <div style={styles.rewardBody}>
                    <h4 style={styles.rewardTitle}>{item.name}</h4>
                    <p style={styles.rewardDesc}>{item.desc}</p>
                    <button
                      style={redeemedItem === item.id ? styles.redeemedBtn : styles.redeemBtn}
                      onClick={() => redeemReward(item)}
                    >
                      {redeemedItem === item.id ? "Claimed ✓" : "Redeem Now"}
                    </button>
                    {redeemedItem === item.id && voucher && (
                      <div style={styles.voucherBox}>
                        <p style={styles.voucherLabel}>VOUCHER CODE</p>
                        <h2 style={styles.voucherCode}>{voucher}</h2>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "25px" },
  heroGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  
  // ✨ GLOWING POINTS CARD STYLES
  glassPointsCard: {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    padding: "35px", borderRadius: "24px", color: "white",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    position: "relative", overflow: "hidden"
  },
  pointsHeader: { display: "flex", alignItems: "center", marginBottom: "25px" },
  trophyWrapper: { position: "relative", marginRight: "20px" },
  trophyIcon: { fontSize: "50px", position: "relative", zIndex: 2 },
  trophyGlow: {
    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
    width: "70px", height: "70px", background: "rgba(59, 130, 246, 0.4)",
    filter: "blur(20px)", borderRadius: "50%"
  },
  pointsDisplay: { 
    fontSize: "52px", fontWeight: "900", margin: "0", 
    textShadow: "0 0 20px rgba(59, 130, 246, 0.6)", // Neon glow
    letterSpacing: "-1px"
  },
  ptsText: { fontSize: "20px", color: "#3b82f6", textShadow: "none" },
  label: { fontSize: "12px", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase", marginBottom: "4px" },
  
  // Progress Glow
  progressContainer: { marginTop: "10px" },
  progressBar: { width: "100%", height: "10px", background: "rgba(255,255,255,0.1)", borderRadius: "10px", position: "relative" },
  progressFill: { height: "100%", background: "linear-gradient(90deg, #3b82f6, #60a5fa)", borderRadius: "10px" },
  progressIndicatorGlow: { 
    position: "absolute", top: "-5px", width: "20px", height: "20px", 
    background: "#fff", borderRadius: "50%", filter: "blur(8px)", transform: "translateX(-50%)" 
  },
  tierLabels: { display: "flex", justifyContent: "space-between", marginTop: "12px", fontSize: "11px", fontWeight: "bold", color: "#475569" },

  // Streak Card Styles
  streakBadgeCard: {
    background: "white", padding: "25px", borderRadius: "24px",
    border: "1px solid #e2e8f0", boxShadow: "0 10px 20px rgba(0,0,0,0.02)",
    display: "flex", flexDirection: "column", justifyContent: "space-between"
  },
  streakHeaderInfo: { display: "flex", alignItems: "center", gap: "15px" },
  fireIcon: { fontSize: "40px" },
  streakCount: { fontSize: "32px", fontWeight: "800", margin: 0, color: "#1e293b" },
  streakSub: { margin: 0, color: "#64748b", fontSize: "14px", fontWeight: "600" },
  badgeProgressBox: { background: "#f8fafc", padding: "18px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "15px" },
  badgeIcon: { fontSize: "32px" },
  badgeName: { fontSize: "14px", fontWeight: "700", margin: "0 0 5px 0" },
  badgeBarOuter: { width: "100%", height: "8px", background: "#e2e8f0", borderRadius: "10px" },
  badgeBarInner: { height: "100%", background: "linear-gradient(90deg, #f59e0b, #fbbf24)", borderRadius: "10px" },
  badgeGoal: { fontSize: "11px", color: "#64748b", marginTop: "8px", fontWeight: "700" },

  contentGrid: { display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "25px" },
  sectionTitle: { fontSize: "18px", fontWeight: "700", marginBottom: "15px", color: "#1e293b" },
  activitySection: { background: "white", padding: "25px", borderRadius: "20px", border: "1px solid #f1f5f9", alignSelf: "start" },
  activityList: { display: "flex", flexDirection: "column", gap: "12px" },
  activityItem: { display: "flex", justifyContent: "space-between", padding: "12px", background: "#f8fafc", borderRadius: "12px", fontWeight: "700", fontSize: "13px" },
  ptsGain: { color: "#10b981" },

  rewardSection: { display: "flex", flexDirection: "column", gap: "20px" },
  rewardsScroll: { display: "flex", flexDirection: "column", gap: "20px" },
  rewardCard: { background: "white", borderRadius: "20px", overflow: "hidden", border: "1px solid #f1f5f9", display: "flex", height: "190px" },
  imgWrapper: { position: "relative", width: "170px", minWidth: "170px" },
  rewardImg: { width: "100%", height: "100%", objectFit: "cover" },
  costBadge: { position: "absolute", bottom: "10px", right: "10px", background: "#1e293b", color: "white", padding: "6px 12px", borderRadius: "10px", fontSize: "11px", fontWeight: "800" },
  rewardBody: { padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" },
  rewardTitle: { margin: "0 0 5px 0", fontSize: "18px", fontWeight: "800" },
  rewardDesc: { fontSize: "13px", color: "#64748b", marginBottom: "15px", lineHeight: "1.4" },
  redeemBtn: { background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "white", border: "none", padding: "10px", borderRadius: "10px", cursor: "pointer", fontWeight: "700" },
  redeemedBtn: { background: "#10b981", color: "white", border: "none", padding: "10px", borderRadius: "10px", fontWeight: "700" },
  voucherBox: { marginTop: "12px", padding: "10px", background: "#f0fdf4", border: "1px dashed #22c55e", borderRadius: "10px", textAlign: "center" },
  voucherLabel: { fontSize: "9px", fontWeight: "900", color: "#15803d" },
  voucherCode: { fontSize: "15px", color: "#166534", margin: "2px 0", fontFamily: "monospace", fontWeight: "bold" }
}

export default Rewards