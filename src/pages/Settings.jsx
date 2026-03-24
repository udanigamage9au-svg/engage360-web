import { useState } from "react"
import DashboardLayout from "./DashboardLayout"

function Settings() {
  const [popup, setPopup] = useState(null)

  return (
    <DashboardLayout activePage="settings" title="Settings" subtitle="Manage your account security and app preferences.">
      <div style={styles.container}>
        
        {/* SECURITY GROUP */}
        <div style={styles.sectionGroup}>
          <h3 style={styles.groupTitle}>Security & Access</h3>
          <div style={styles.card}>
            <SettingItem
              title="Password Change"
              subtitle="Update your login credentials"
              icon="🔒"
              onClick={() => setPopup("password")}
            />
            <SettingItem
              title="Logged In Devices"
              subtitle="Manage where you are signed in"
              icon="💻"
              onClick={() => setPopup("devices")}
              isLast
            />
          </div>
        </div>

        {/* CAMPUS SERVICES GROUP */}
        <div style={styles.sectionGroup}>
          <h3 style={styles.groupTitle}>Campus Services</h3>
          <div style={styles.card}>
            <SettingItem
              title="Bus Card Expire Dates"
              subtitle="Check validity of transit passes"
              icon="🚌"
              onClick={() => setPopup("bus")}
              isLast
            />
          </div>
        </div>

        {/* PREFERENCES & INFO */}
        <div style={styles.sectionGroup}>
          <h3 style={styles.groupTitle}>Application</h3>
          <div style={styles.card}>
            <SettingItem
              title="Language"
              subtitle="Change app display language"
              icon="🌐"
              onClick={() => setPopup("language")}
            />
            <SettingItem
              title="Help & Support"
              subtitle="Contact us for assistance"
              icon="❓"
              onClick={() => setPopup("help")}
            />
            <SettingItem
              title="About"
              subtitle="Version, terms and information"
              icon="ℹ️"
              onClick={() => setPopup("about")}
              isLast
            />
          </div>
        </div>
      </div>

      {/* POPUPS */}
      {popup === "password" && <PasswordPopup close={() => setPopup(null)} />}
      {popup === "devices" && <DevicesPopup close={() => setPopup(null)} />}
      {popup === "bus" && <BusPopup close={() => setPopup(null)} />}
      {popup === "language" && <LanguagePopup close={() => setPopup(null)} />}
      {popup === "help" && <HelpPopup close={() => setPopup(null)} />}
      {popup === "about" && <AboutPopup close={() => setPopup(null)} />}
    </DashboardLayout>
  )
}

function SettingItem({ title, subtitle, icon, onClick, isLast }) {
  return (
    <div 
      style={{...styles.item, borderBottom: isLast ? 'none' : '1px solid #f1f5f9'}} 
      onClick={onClick}
    >
      <div style={styles.iconWrapper}>{icon}</div>
      <div style={styles.text}>
        <div style={styles.itemTitle}>{title}</div>
        <div style={styles.itemSubtitle}>{subtitle}</div>
      </div>
      <div style={styles.arrow}>❯</div>
    </div>
  )
}

function Modal({ title, children, close }) {
  return (
    <div style={styles.overlay} onClick={close}>
      <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>{title}</h2>
          <button style={styles.closeBtn} onClick={close}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

// Sub-Popups Components
function PasswordPopup({ close }) {
  return (
    <Modal title="Change Password" close={close}>
      <div style={styles.inputStack}>
        <label style={styles.fieldLabel}>Current Password</label>
        <input type="password" placeholder="••••••••" style={styles.input} />
        <label style={styles.fieldLabel}>New Password</label>
        <input type="password" placeholder="Min. 8 characters" style={styles.input} />
        <label style={styles.fieldLabel}>Confirm New Password</label>
        <input type="password" placeholder="••••••••" style={styles.input} />
      </div>
      <div style={styles.modalFooter}>
        <button style={styles.primaryBtn} onClick={close}>Update Password</button>
        <button style={styles.secondaryBtn} onClick={close}>Cancel</button>
      </div>
    </Modal>
  )
}

function DevicesPopup({ close }) {
  return (
    <Modal title="Active Sessions" close={close}>
      <div style={styles.deviceList}>
        <div style={styles.deviceRow}>
          <div>
            <div style={{fontWeight:'600'}}>Windows Laptop • Chrome</div>
            <div style={{fontSize:'12px', color:'#64748b'}}>Colombo, Sri Lanka • Active Now</div>
          </div>
          <span style={styles.activeTag}>Current</span>
        </div>
        <div style={styles.deviceRow}>
          <div>
            <div style={{fontWeight:'600'}}>iPhone 15 Pro</div>
            <div style={{fontSize:'12px', color:'#64748b'}}>Gampaha • 2 hours ago</div>
          </div>
        </div>
      </div>
      <button style={styles.dangerBtn}>Sign Out All Other Devices</button>
    </Modal>
  )
}

function BusPopup({ close }) {
  return (
    <Modal title="Transit Status" close={close}>
      <div style={styles.busCardInfo}>
        <div style={styles.busHeader}>
          <span style={styles.busRoute}>Gampaha Route</span>
          <span style={styles.expiringTag}>Expiring Soon</span>
        </div>
        <div style={styles.busDate}>Valid until: <strong>2024-05-15</strong></div>
      </div>
      <div style={styles.modalFooter}>
        <button style={styles.primaryBtn}>Renew Card</button>
        <button style={styles.secondaryBtn} onClick={close}>Close</button>
      </div>
    </Modal>
  )
}

function LanguagePopup({ close }) {
  return (
    <Modal title="Select Language" close={close}>
      <select style={styles.input}>
        <option>English (US)</option>
        <option>Sinhala (සිංහල)</option>
        <option>Tamil (தமிழ்)</option>
      </select>
      <div style={styles.modalFooter}>
        <button style={styles.primaryBtn} onClick={close}>Save Preference</button>
      </div>
    </Modal>
  )
}

function HelpPopup({ close }) {
  return (
    <Modal title="Support Center" close={close}>
      <p style={{color:'#64748b', fontSize:'14px', marginBottom:'20px'}}>Need help? Our team is available 9 AM - 5 PM.</p>
      <div style={styles.contactCard}>
        <div>📧 support@engage360.lk</div>
        <div style={{marginTop:'10px'}}>📞 +94 11 234 5678</div>
      </div>
      
    </Modal>
  )
}

function AboutPopup({ close }) {
  return (
    <Modal title="About Engage360" close={close}>
      <div style={{textAlign:'center', padding:'10px 0'}}>
        <div style={{fontSize:'40px', marginBottom:'10px'}}>🚀</div>
        <p style={{fontSize:'14px', lineHeight:'1.6', color:'#475569'}}>
          Engage360 is the ultimate campus companion for students. 
          Bringing everything from transit to rewards into one platform.
        </p>
        <div style={styles.versionTag}>Version 1.0.3 Stable</div>
      </div>
    </Modal>
  )
}

const styles = {
  container: { maxWidth: "800px", display: "flex", flexDirection: "column", gap: "30px" },
  sectionGroup: { display: 'flex', flexDirection: 'column', gap: '12px' },
  groupTitle: { fontSize: '13px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginLeft: '5px' },
  card: { background: '#fff', borderRadius: '18px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' },
  item: { display: "flex", alignItems: "center", padding: "16px 20px", cursor: "pointer", gap: "16px", transition: '0.2s' },
  iconWrapper: { width: '40px', height: '40px', borderRadius: '10px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
  text: { flex: 1 },
  itemTitle: { fontWeight: "600", fontSize: '15px', color: '#1e293b' },
  itemSubtitle: { fontSize: "13px", color: "#64748b", marginTop: '2px' },
  arrow: { fontSize: "14px", color: '#cbd5e1' },
  
  overlay: { position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", backdropFilter: 'blur(4px)', display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  popup: { background: "white", padding: "30px", borderRadius: "24px", width: "440px", boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  modalTitle: { fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: 0 },
  closeBtn: { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#94a3b8' },
  
  inputStack: { display: 'flex', flexDirection: 'column', gap: '15px' },
  fieldLabel: { fontSize: '12px', fontWeight: '600', color: '#64748b' },
  input: { width: "100%", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: '14px' },
  
  modalFooter: { display: "flex", gap: "10px", marginTop: "25px" },
  primaryBtn: { flex: 1, background: "#2f6edb", color: "white", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "600", cursor: "pointer" },
  secondaryBtn: { padding: "12px 20px", background: "#f1f5f9", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer", color: '#475569' },
  dangerBtn: { width: '100%', marginTop: '20px', padding: '12px', background: 'none', border: '1px solid #fee2e2', color: '#ef4444', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' },
  
  deviceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' },
  activeTag: { fontSize: '10px', background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '6px', fontWeight: '700' },
  
  busCardInfo: { background: '#f8fafc', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0' },
  busHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  busRoute: { fontWeight: '700', color: '#1e293b' },
  expiringTag: { background: '#fef9c3', color: '#854d0e', fontSize: '11px', padding: '4px 8px', borderRadius: '6px', fontWeight: '700' },
  versionTag: { display: 'inline-block', marginTop: '20px', padding: '4px 12px', background: '#f1f5f9', borderRadius: '20px', fontSize: '12px', color: '#64748b' },
  contactCard: { background: '#f1f5f9', padding: '15px', borderRadius: '12px', fontWeight: '600', color: '#1e293b' }
}

export default Settings