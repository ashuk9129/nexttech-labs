// Default NextTech Labs client
(function seedDefaultClient(){

  const clients =
    JSON.parse(localStorage.getItem("nexttech_clients") || "[]");

  const exists = clients.some(
    client => client.email === "info@diabeticyoga.com"
  );

  if(!exists){

    clients.push({
      id: Date.now(),
      business: "Diabetic Yoga Sewa",
      owner: "Diabetic Yoga Sewa",
      industry: "Fitness",
      phone: "8299434924",
      email: "info@diabeticyoga.com",
      website: "https://diabeticyoga.com/",
      address: "",
      city: "Lucknow",
      services: [
        "Social Media",
        "WhatsApp",
        "Google Business",
        "Lead Management",
        "Automation",
        "Analytics"
      ],
      status: "Active",
      leads: 0,
      createdAt: new Date().toISOString()
    });

    localStorage.setItem(
      "nexttech_clients",
      JSON.stringify(clients)
    );
  }

})();
function show(id,btn){
  document.querySelectorAll('.content').forEach(x=>x.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));
  if(btn) btn.classList.add('active');

  if(id === 'automation') renderAutomationHub();
}
function login(){
  const email=document.getElementById('email').value.trim();
  const pass=document.getElementById('password').value;
  const error=document.getElementById('error');
  if(!email||!pass){error.textContent='Enter your email and password.';return;}
  if(email==='admin@nexttechlabs.in'&&pass==='123456'){
    localStorage.setItem('nth_logged_in','1');
    document.getElementById('login').style.display='none';
  }else{
    error.textContent='Invalid demo credentials.';
  }
}
if(localStorage.getItem('nth_logged_in')==='1'){
  document.getElementById('login').style.display='none';
}
function openClientModal(){
  document.getElementById("clientModal").classList.add("show");
}

function closeClientModal(){
  document.getElementById("clientModal").classList.remove("show");
}

function createClient(){

  const business = document.getElementById("clientBusiness").value.trim();
  const owner = document.getElementById("clientOwner").value.trim();
  const industry = document.getElementById("clientIndustry").value;
  const phone = document.getElementById("clientPhone").value.trim();
  const email = document.getElementById("clientEmail").value.trim();

  if(!business || !owner || !industry || !phone || !email){
    alert("Please fill all required fields.");
    return;
  }

  const services = [];

  document
    .querySelectorAll(".service-option input:checked")
    .forEach(input => {
      services.push(input.value);
    });

  const client = {
    id: Date.now(),
    business,
    owner,
    industry,
    phone,
    email,
    website: document.getElementById("clientWebsite").value.trim(),
    address: document.getElementById("clientAddress").value.trim(),
    city: document.getElementById("clientCity").value.trim(),
    services,
    status: "Active",
    leads: 0,
    createdAt: new Date().toISOString()
  };

  const clients =
    JSON.parse(localStorage.getItem("nexttech_clients") || "[]");

  clients.push(client);

  localStorage.setItem(
    "nexttech_clients",
    JSON.stringify(clients)
  );

  closeClientModal();

  alert(
    "Client created successfully!\n\n" +
    business +
    " is now added to NextTech Hub."
  );

  location.reload();
}
function renderClients(){

  const tableBody = document.getElementById("clientsTableBody");

  if(!tableBody) return;

  const clients =
    JSON.parse(localStorage.getItem("nexttech_clients") || "[]");

  if(clients.length === 0){
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center;padding:30px;color:#8d98ad;">
          No clients added yet.
        </td>
      </tr>
    `;
    return;
  }

  const allLeads = JSON.parse(localStorage.getItem("nexttech_leads") || "[]");

  tableBody.innerHTML = clients.map(client => {

    const connected =
      client.services && client.services.length
      ? client.services.join(" · ")
      : "No services";

    const leadCount =
      allLeads.filter(l => String(l.clientId) === String(client.id)).length;

    return `
      <tr>
        <td>
          <b class="client-link" onclick="openClientWorkspace(${client.id})">
  ${client.business}
</b>
          <br>
          <span class="small">${client.owner}</span>
        </td>

        <td>${client.industry}</td>

        <td>${connected}</td>

        <td>${leadCount}</td>

        <td>
          <span class="pill">${client.status}</span>
        </td>
      </tr>
    `;

  }).join("");
}
renderClients();

/* Currently open client workspace (drives CRM, Customers, Automation, etc.) */
let currentClientId = null;

function openClientWorkspace(clientId){

  const clients =
    JSON.parse(localStorage.getItem("nexttech_clients") || "[]");

  const client = clients.find(c => String(c.id) === String(clientId));

  if(!client) return;

  currentClientId = client.id;

  document.querySelectorAll(".content").forEach(section => {
    section.classList.remove("active");
  });

  const workspace = document.getElementById("clientWorkspace");

  const allLeads = JSON.parse(localStorage.getItem("nexttech_leads") || "[]")
    .filter(l => String(l.clientId) === String(client.id));
  const allCustomers = JSON.parse(localStorage.getItem("nexttech_customers") || "[]")
    .filter(c => String(c.clientId) === String(client.id));
  const allAutomations = JSON.parse(localStorage.getItem("nexttech_automation_rules") || "[]")
    .filter(a => String(a.clientId) === String(client.id) && a.active);

  workspace.innerHTML = `
    <div class="topbar">
      <div>
        <button class="back-btn" onclick="closeClientWorkspace()">
          ← Back to Clients
        </button>

        <div class="eyebrow" style="margin-top:18px">
          CLIENT WORKSPACE
        </div>

        <h1>${client.business}</h1>

        <div class="sub">
          ${client.industry} · ${client.city || "Location not added"}
          · <span style="color:var(--green)">● Active</span>
        </div>
      </div>

      <div class="profile">
        <div class="avatar">
          ${client.business.substring(0,2).toUpperCase()}
        </div>

        <div>
          <b>${client.owner}</b>
          <br>
          <span class="small">${client.email}</span>
        </div>
      </div>
    </div>

    <div class="metric-grid">

      <div class="card">
        <div class="label">Total Leads</div>
        <div class="num">${allLeads.length}</div>
        <div class="trend">Client leads</div>
      </div>

      <div class="card">
        <div class="label">Customers</div>
        <div class="num">${allCustomers.length}</div>
        <div class="trend">Converted</div>
      </div>

      <div class="card">
        <div class="label">Scheduled Posts</div>
        <div class="num">0</div>
        <div class="trend">Social media</div>
      </div>

      <div class="card">
        <div class="label">Automations</div>
        <div class="num">${allAutomations.length}</div>
        <div class="trend">Active workflows</div>
      </div>

    </div>

    <div class="client-workspace-grid">

      <div class="panel">
        <div class="panel-head">
          <h3>Client Overview</h3>
          <span class="pill">Active</span>
        </div>

        <div class="workspace-info">

          <div>
            <span class="small">Business Owner</span>
            <b>${client.owner}</b>
          </div>

          <div>
            <span class="small">Phone</span>
            <b>${client.phone}</b>
          </div>

          <div>
            <span class="small">Email</span>
            <b>${client.email}</b>
          </div>

          <div>
            <span class="small">Website</span>
            <b>${client.website || "Not added"}</b>
          </div>

          <div>
            <span class="small">Location</span>
            <b>${client.address || ""} ${client.city || ""}</b>
          </div>

        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <h3>Connected Services</h3>
        </div>

        <div class="service-status">

          ${
            client.services && client.services.length
            ? client.services.map(service => `
              <div class="service-row">
                <span>${service}</span>
                <span class="status">
                  <i class="dot"></i> Ready
                </span>
              </div>
            `).join("")
            : `
              <div class="small">
                No services connected yet.
              </div>
            `
          }

        </div>
      </div>

    </div>

    <div class="client-tools">

      <button onclick="clientTool('Leads & CRM')">
        <span>◉</span>
        <b>Leads & CRM</b>
        <small>Manage leads</small>
      </button>

      <button onclick="clientTool('Customers')">
        <span>★</span>
        <b>Customers</b>
        <small>Converted accounts</small>
      </button>

      <button onclick="clientTool('Unified Inbox')">
        <span>✉</span>
        <b>Unified Inbox</b>
        <small>Messages & reviews</small>
      </button>

      <button onclick="clientTool('Social Media')">
        <span>◎</span>
        <b>Social Media</b>
        <small>Content & scheduling</small>
      </button>

      <button onclick="clientTool('Automation')">
        <span>⚡</span>
        <b>Automation</b>
        <small>Create workflows</small>
      </button>

      <button onclick="clientTool('Google Business')">
        <span>⌖</span>
        <b>Google Business</b>
        <small>Reviews & profile</small>
      </button>

      <button onclick="clientTool('Analytics')">
        <span>▥</span>
        <b>Analytics</b>
        <small>Performance reports</small>
      </button>

    </div>
  `;

  workspace.classList.add("active");
}

function closeClientWorkspace(){

  document.getElementById("clientWorkspace")
    .classList.remove("active");

  document.getElementById("clients")
    .classList.add("active");

  document.querySelectorAll(".nav button")
    .forEach(btn => btn.classList.remove("active"));

  document.querySelectorAll(".nav button")
    .forEach(btn => {
      if(btn.textContent.includes("Clients")){
        btn.classList.add("active");
      }
    });
}

function clientTool(name){

  if(name === "Leads & CRM"){
    openCRM();
    return;
  }

  if(name === "Customers"){
    openCustomers();
    return;
  }

  if(name === "Automation"){
    show('automation', document.querySelector('.nav button[onclick*="automation"]'));
    return;
  }

  alert(name + " module will open here.");
}
function getCurrentClient(){
  const clients =
    JSON.parse(localStorage.getItem("nexttech_clients") || "[]");
  return clients.find(c => String(c.id) === String(currentClientId));
}
function openCRM(){

  const workspace = document.getElementById("clientWorkspace");
  const crm = document.getElementById("crmModule");

  if(!workspace || !crm) return;

  workspace.classList.remove("active");

  const activeClient = getCurrentClient();

  if(!activeClient){
    alert("Open a client workspace first.");
    return;
  }

  crm.innerHTML = `
    <div class="topbar">

      <div>
        <button class="back-btn" onclick="closeCRM()">
          ← Back to Workspace
        </button>

        <div class="eyebrow" style="margin-top:18px">
          LEADS & CRM
        </div>

        <h1>${activeClient.business}</h1>

        <div class="sub">
          Manage leads, follow-ups and conversions
        </div>
      </div>

      <button class="btn" onclick="openAddLead()">
        + Add Lead
      </button>

    </div>

    <div class="metric-grid">

      <div class="card">
        <div class="label">Total Leads</div>
        <div class="num" id="crmTotalLeads">0</div>
        <div class="trend">All leads</div>
      </div>

      <div class="card">
        <div class="label">New</div>
        <div class="num" id="crmNewLeads">0</div>
        <div class="trend">Needs attention</div>
      </div>

      <div class="card">
        <div class="label">Follow-up</div>
        <div class="num" id="crmFollowupLeads">0</div>
        <div class="trend">Upcoming</div>
      </div>

      <div class="card">
        <div class="label">Converted</div>
        <div class="num" id="crmConvertedLeads">0</div>
        <div class="trend">Successful</div>
      </div>
<div class="card followup-card"
     onclick="filterFollowups('today')">

  <div class="label">🔔 Due Today</div>
  <div class="num" id="crmDueToday">0</div>
  <div class="trend">Follow-ups due today</div>

</div>

<div class="card followup-card"
     onclick="filterFollowups('overdue')">

  <div class="label">🔴 Overdue</div>
  <div class="num" id="crmOverdue">0</div>
  <div class="trend">Needs attention</div>

</div>

<div class="card followup-card"
     onclick="filterFollowups('upcoming')">

  <div class="label">📅 Upcoming</div>
  <div class="num" id="crmUpcoming">0</div>
  <div class="trend">Future follow-ups</div>

</div>
    </div>

    <div class="panel" style="margin-top:15px">

      <div class="panel-head">
        <div>
          <h3>Lead Pipeline</h3>
          <span class="small">
            ${activeClient.business}
          </span>
        </div>

        <select id="leadFilter" onchange="renderCRMLeads()">
          <option value="All">All Leads</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      <div id="crmLeadsTable"></div>

    </div>
  `;

  crm.classList.add("active");

  renderCRMLeads();
}
function getClientLeads(){

  const client = getCurrentClient();

  if(!client) return [];

  const allLeads =
    JSON.parse(localStorage.getItem("nexttech_leads") || "[]");

  return allLeads.filter(
    lead => String(lead.clientId) === String(client.id)
  );
}
function renderCRMLeads(){

  const container =
    document.getElementById("crmLeadsTable");

  if(!container) return;

  const leads = getClientLeads();

  const filter =
    document.getElementById("leadFilter")?.value || "All";

  const filtered =
    filter === "All"
      ? leads
      : leads.filter(lead => lead.status === filter);

  if(document.getElementById("crmTotalLeads"))
    document.getElementById("crmTotalLeads").textContent = leads.length;

  if(document.getElementById("crmNewLeads"))
    document.getElementById("crmNewLeads").textContent =
      leads.filter(l => l.status === "New").length;

  if(document.getElementById("crmFollowupLeads"))
    document.getElementById("crmFollowupLeads").textContent =
      leads.filter(l => l.status === "Follow-up").length;

  if(document.getElementById("crmConvertedLeads"))
    document.getElementById("crmConvertedLeads").textContent =
      leads.filter(l => l.status === "Converted").length;

  /* Follow-up counters */

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let dueToday = 0;
  let overdue = 0;
  let upcoming = 0;

  leads.forEach(lead => {

    if(!lead.followup) return;

    const date = new Date(lead.followup);
    date.setHours(0, 0, 0, 0);

    const diff = Math.ceil(
      (date - today) /
      (1000 * 60 * 60 * 24)
    );

    if(diff === 0) dueToday++;
    else if(diff < 0) overdue++;
    else upcoming++;
  });

  if(document.getElementById("crmDueToday"))
    document.getElementById("crmDueToday").textContent = dueToday;

  if(document.getElementById("crmOverdue"))
    document.getElementById("crmOverdue").textContent = overdue;

  if(document.getElementById("crmUpcoming"))
    document.getElementById("crmUpcoming").textContent = upcoming;


  if(filtered.length === 0){

    container.innerHTML = `
      <div class="empty-crm">

        <div class="empty-icon">◎</div>

        <h3>No leads yet</h3>

        <p>
          Start adding leads for this client.
        </p>

        <button class="btn" onclick="openAddLead()">
          + Add First Lead
        </button>

      </div>
    `;

    return;
  }


  container.innerHTML = `
    <div class="crm-table">

      <div class="crm-row crm-row-6 crm-head">

        <span>Lead</span>
        <span>Phone</span>
        <span>Source</span>
        <span>Status</span>
        <span>Follow-up</span>
        <span>Actions</span>

      </div>

      ${filtered.map(lead => `

        <div class="crm-row crm-row-6">

          <span>
            <b>${lead.name}</b>
            <small>${lead.email || "No email"}</small>
          </span>

          <span>${lead.phone || "—"}</span>

          <span>${lead.source || "Manual"}</span>

          <span>
            <span class="lead-status ${
              (lead.status || "New")
                .toLowerCase()
                .replace(" ", "-")
            }">
              ${lead.status || "New"}
            </span>
          </span>

          <span>
            ${getFollowupDisplay(lead)}
          </span>

          <span class="crm-actions">
            <button class="btn secondary" onclick="openEditLead(${lead.id})" title="Edit">✏️</button>
            <button class="btn secondary" onclick="openLeadNotes(${lead.id})" title="Notes">📝</button>
            <button class="btn secondary" onclick="openLeadActivity(${lead.id})" title="Activity">🕐</button>
            <button class="btn secondary" onclick="deleteLead(${lead.id})" title="Delete">🗑️</button>
          </span>

        </div>

      `).join("")}

    </div>
  `;
}


/* FOLLOW-UP FILTER */

function filterFollowups(type){

  const leads = getClientLeads();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filtered = leads.filter(lead => {

    if(!lead.followup) return false;

    const date = new Date(lead.followup);
    date.setHours(0, 0, 0, 0);

    const diff = Math.ceil(
      (date - today) /
      (1000 * 60 * 60 * 24)
    );

    if(type === "today") return diff === 0;

    if(type === "overdue") return diff < 0;

    if(type === "upcoming") return diff > 0;

    return false;
  });


  const container =
    document.getElementById("crmLeadsTable");

  if(!container) return;


  if(filtered.length === 0){

    container.innerHTML = `
      <div class="empty-crm">

        <div class="empty-icon">✓</div>

        <h3>No follow-ups found</h3>

        <p>
          There are no leads in this category.
        </p>

        <button class="btn"
                onclick="renderCRMLeads()">
          Show All Leads
        </button>

      </div>
    `;

    return;
  }


  container.innerHTML = `
    <div class="crm-table">

      <div class="crm-row crm-head">

        <span>Lead</span>
        <span>Phone</span>
        <span>Source</span>
        <span>Status</span>
        <span>Follow-up</span>

      </div>

      ${filtered.map(lead => `

        <div class="crm-row">

          <span>
            <b>${lead.name}</b>
            <small>${lead.email || "No email"}</small>
          </span>

          <span>${lead.phone || "—"}</span>

          <span>${lead.source || "Manual"}</span>

          <span>
            <select class="lead-status-select"
        onchange="updateLeadStatus(${lead.id}, this.value)">

  <option value="New" ${lead.status === "New" ? "selected" : ""}>
    New
  </option>

  <option value="Contacted" ${lead.status === "Contacted" ? "selected" : ""}>
    Contacted
  </option>

  <option value="Follow-up" ${lead.status === "Follow-up" ? "selected" : ""}>
    Follow-up
  </option>

  <option value="Converted" ${lead.status === "Converted" ? "selected" : ""}>
    Converted
  </option>

  <option value="Lost" ${lead.status === "Lost" ? "selected" : ""}>
    Lost
  </option>

</select>
          </span>

          <span>
            ${getFollowupDisplay(lead)}
          </span>

        </div>

      `).join("")}

    </div>

    <button class="btn secondary"
            style="margin-top:15px"
            onclick="renderCRMLeads()">
      ← Show All Leads
    </button>
  `;
}
function updateLeadStatus(leadId, newStatus){

  const leads =
    JSON.parse(
      localStorage.getItem("nexttech_leads") || "[]"
    );

  const lead =
    leads.find(l => String(l.id) === String(leadId));

  if(!lead) return;

  const oldStatus = lead.status;

  lead.status = newStatus;

  logLeadActivity(
    lead,
    "Status Changed",
    "Lead status changed from " + (oldStatus || "New") + " to " + newStatus
  );

  localStorage.setItem(
    "nexttech_leads",
    JSON.stringify(leads)
  );

  if(newStatus === "Converted" && oldStatus !== "Converted"){
    convertLeadToCustomer(lead);
  }

  renderCRMLeads();
}

/* Convert a lead into a customer record (Lead -> Customer lifecycle) */
function convertLeadToCustomer(lead){

  const customers =
    JSON.parse(localStorage.getItem("nexttech_customers") || "[]");

  const alreadyCustomer =
    customers.some(c => String(c.leadId) === String(lead.id));

  if(alreadyCustomer) return;

  const customer = {
    id: Date.now(),
    leadId: lead.id,
    clientId: lead.clientId,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    source: lead.source,
    notes: lead.notes || "",
    tags: lead.tags || [],
    conversionDate: new Date().toISOString(),
    activities: []
  };

  customers.push(customer);

  localStorage.setItem(
    "nexttech_customers",
    JSON.stringify(customers)
  );

  logLeadActivity(lead, "Lead Converted", "Lead converted to customer");
}
let editingLeadId = null;
function logLeadActivity(lead, type, text){

  if(!lead) return;

  if(!lead.activities){
    lead.activities = [];
  }

  lead.activities.unshift({
    date: new Date().toLocaleString("en-IN"),
    type: type,
    text: text
  });
}
function openLeadActivity(leadId){

  const leads =
    JSON.parse(
      localStorage.getItem("nexttech_leads") || "[]"
    );

  const lead =
    leads.find(
      l => String(l.id) === String(leadId)
    );

  if(!lead) return;

  const activities = lead.activities || [];

  let message =
    "Activity History — " + lead.name + "\n\n";

  if(activities.length === 0){

    message += "No activities recorded yet.";

  }else{

    activities.forEach((activity, index) => {

      message +=
        (index + 1) + ". " +
        (activity.date || "") +
        " — " +
        (activity.type || "Activity") +
        "\n" +
        (activity.text || "") +
        "\n\n";

    });

  }

  alert(message);
}
function openLeadNotes(leadId){

  const leads =
    JSON.parse(
      localStorage.getItem("nexttech_leads") || "[]"
    );

  const lead =
    leads.find(
      l => String(l.id) === String(leadId)
    );

  if(!lead) return;

  const notes =
    prompt(
      "Notes for " + lead.name + ":",
      lead.notes || ""
    );

  if(notes === null) return;

  lead.notes = notes;

  localStorage.setItem(
    "nexttech_leads",
    JSON.stringify(leads)
  );

  renderCRMLeads();
}
function deleteLead(leadId){

  const confirmed =
    confirm("Are you sure you want to delete this lead?");

  if(!confirmed) return;

  const leads =
    JSON.parse(
      localStorage.getItem("nexttech_leads") || "[]"
    );

  const updatedLeads =
    leads.filter(
      lead => String(lead.id) !== String(leadId)
    );

  localStorage.setItem(
    "nexttech_leads",
    JSON.stringify(updatedLeads)
  );

  renderCRMLeads();
}

function openEditLead(leadId){

  const leads =
    JSON.parse(
      localStorage.getItem("nexttech_leads") || "[]"
    );

  const lead =
    leads.find(l => String(l.id) === String(leadId));

  if(!lead) return;

  editingLeadId = leadId;

  document.getElementById("leadName").value =
    lead.name || "";

  document.getElementById("leadPhone").value =
    lead.phone || "";

  document.getElementById("leadEmail").value =
    lead.email || "";

  document.getElementById("leadSource").value =
    lead.source || "";

  document.getElementById("leadFollowup").value =
    lead.followup || "";

  document.getElementById("leadStatus").value =
    lead.status || "New";

  document.getElementById("leadNotes").value =
    lead.notes || "";

  const modal =
    document.getElementById("leadModal");

  if(modal)
    modal.classList.add("show");
}
function getFollowupDisplay(lead){

  if(!lead.followup){
    return `<span class="followup-none">—</span>`;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const followupDate = new Date(lead.followup);
  followupDate.setHours(0, 0, 0, 0);

  const diff =
    Math.ceil(
      (followupDate - today) / (1000 * 60 * 60 * 24)
    );

  if(diff < 0){

    return `
      <span class="followup-badge overdue">
        🔴 Overdue
      </span>
      <small>${lead.followup}</small>
    `;

  }

  if(diff === 0){

    return `
      <span class="followup-badge today">
        🔔 Due Today
      </span>
      <small>${lead.followup}</small>
    `;

  }

  return `
    <span class="followup-badge upcoming">
      📅 Upcoming
    </span>
    <small>${lead.followup}</small>
  `;
}
/* ===================== CUSTOMERS ===================== */

function openCustomers(){

  const workspace = document.getElementById("clientWorkspace");
  const crm = document.getElementById("crmModule");
  const customersEl = document.getElementById("customersModule");

  if(!customersEl) return;

  const activeClient = getCurrentClient();

  if(!activeClient){
    alert("Open a client workspace first.");
    return;
  }

  if(workspace) workspace.classList.remove("active");
  if(crm) crm.classList.remove("active");

  const customers =
    JSON.parse(localStorage.getItem("nexttech_customers") || "[]")
      .filter(c => String(c.clientId) === String(activeClient.id));

  customersEl.innerHTML = `
    <div class="topbar">
      <div>
        <button class="back-btn" onclick="closeCustomers()">← Back to Workspace</button>
        <div class="eyebrow" style="margin-top:18px">CUSTOMERS</div>
        <h1>${activeClient.business}</h1>
        <div class="sub">Customers converted from leads for this business</div>
      </div>
    </div>

    <div class="metric-grid">
      <div class="card"><div class="label">Total Customers</div><div class="num">${customers.length}</div><div class="trend">Converted from leads</div></div>
    </div>

    <div class="panel" style="margin-top:15px">
      ${
        customers.length === 0
        ? `<div class="empty-crm">
             <div class="empty-icon">◉</div>
             <h3>No customers yet</h3>
             <p>Convert a lead to "Converted" status in the CRM to see it here.</p>
           </div>`
        : `<div class="crm-table">
             <div class="crm-row crm-row-6 crm-head">
               <span>Customer</span><span>Phone</span><span>Source</span><span>Converted</span><span>Notes</span><span>Tags</span>
             </div>
             ${customers.map(c => `
               <div class="crm-row crm-row-6">
                 <span><b>${c.name}</b><small>${c.email || "No email"}</small></span>
                 <span>${c.phone || "—"}</span>
                 <span>${c.source || "Manual"}</span>
                 <span>${new Date(c.conversionDate).toLocaleDateString("en-IN")}</span>
                 <span>${c.notes || "—"}</span>
                 <span>${(c.tags || []).join(", ") || "—"}</span>
               </div>
             `).join("")}
           </div>`
      }
    </div>
  `;

  customersEl.classList.add("active");
}

function closeCustomers(){
  document.getElementById("customersModule").classList.remove("active");
  document.getElementById("clientWorkspace").classList.add("active");
}

function closeCRM(){

  document.getElementById("crmModule")
    .classList.remove("active");

  document.getElementById("clientWorkspace")
    .classList.add("active");
}
function openAddLead(){

  const modal = document.getElementById("leadModal");

  if(!modal) return;

  modal.classList.add("show");

  document.getElementById("leadName").focus();
}


function closeAddLead(){

  const modal = document.getElementById("leadModal");

  if(!modal) return;

  modal.classList.remove("show");
}


function saveLead(){

  const name =
    document.getElementById("leadName").value.trim();

  const phone =
    document.getElementById("leadPhone").value.trim();

  const email =
    document.getElementById("leadEmail").value.trim();

  const source =
    document.getElementById("leadSource").value;

  const followup =
    document.getElementById("leadFollowup").value;

  const status =
    document.getElementById("leadStatus").value;

  const notes =
    document.getElementById("leadNotes").value.trim();


  if(!name || !phone){

    alert("Please enter Lead Name and Mobile.");

    return;
  }


  const client = getCurrentClient();

  if(!client){

    alert("Open a client workspace before adding a lead.");

    return;
  }


  const leads =
    JSON.parse(
      localStorage.getItem("nexttech_leads") || "[]"
    );


  const newLead = {

    id: Date.now(),

    clientId: client.id,

    name: name,

    phone: phone,

    email: email,

    source: source,

    followup: followup,

    status: status,

    notes: notes,

    createdAt:
      new Date().toISOString()

  };
if(editingLeadId){

  const existingLead =
    leads.find(
      l => String(l.id) === String(editingLeadId)
    );

  if(existingLead){

    const oldStatus = existingLead.status;

    existingLead.name = name;
    existingLead.phone = phone;
    existingLead.email = email;
    existingLead.source = source;
    existingLead.followup = followup;
    existingLead.status = status;
    existingLead.notes = notes;

    logLeadActivity(existingLead, "Lead Edited", "Lead details updated");

    if(status !== oldStatus){
      logLeadActivity(
        existingLead,
        "Status Changed",
        "Lead status changed from " + (oldStatus || "New") + " to " + status
      );
    }

    localStorage.setItem(
      "nexttech_leads",
      JSON.stringify(leads)
    );

    if(status === "Converted" && oldStatus !== "Converted"){
      convertLeadToCustomer(existingLead);
    }

    editingLeadId = null;

    closeAddLead();
    renderCRMLeads();

    return;
  }

  editingLeadId = null;
}
leads.push(newLead);

logLeadActivity(
  newLead,
  "Lead Created",
  "New lead added to CRM"
);


  localStorage.setItem(
    "nexttech_leads",
    JSON.stringify(leads)
  );


  closeAddLead();


  document.getElementById("leadName").value = "";
  document.getElementById("leadPhone").value = "";
  document.getElementById("leadEmail").value = "";
  document.getElementById("leadFollowup").value = "";
  document.getElementById("leadNotes").value = "";


  renderCRMLeads();

}
/* ===================== AUTOMATION HUB ===================== */

const AUTOMATION_CATEGORIES = [
  "WhatsApp Automation","Instagram Automation","Facebook Automation",
  "Google Business Automation","Email Automation","SMS Automation",
  "Website Automation","Google Ads Automation","Telegram Automation",
  "Appointment Automation","Review Automation","Lead Automation",
  "Sales Automation","Marketing Automation","Customer Automation",
  "Retention Automation","Notification Automation"
];

let editingAutomationId = null;

function populateAutomationDropdowns(){

  const clients = JSON.parse(localStorage.getItem("nexttech_clients") || "[]");

  const clientOptionsHtml = clients
    .map(c => `<option value="${c.id}">${c.business}</option>`)
    .join("");

  const autoClientSel = document.getElementById("autoClient");
  if(autoClientSel){
    autoClientSel.innerHTML = clientOptionsHtml || `<option value="">No clients yet</option>`;
  }

  const filterSel = document.getElementById("automationClientFilter");
  if(filterSel){
    filterSel.innerHTML =
      `<option value="All">All clients</option>` + clientOptionsHtml;
  }

  const categoryOptionsHtml = AUTOMATION_CATEGORIES
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join("");

  const autoCategorySel = document.getElementById("autoCategory");
  if(autoCategorySel) autoCategorySel.innerHTML = categoryOptionsHtml;

  const categoryFilterSel = document.getElementById("automationCategoryFilter");
  if(categoryFilterSel){
    categoryFilterSel.innerHTML =
      `<option value="All">All categories</option>` + categoryOptionsHtml;
  }
}

function renderAutomationCategoryGrid(){

  const grid = document.getElementById("automationCategoryGrid");
  if(!grid) return;

  const rules = JSON.parse(localStorage.getItem("nexttech_automation_rules") || "[]");

  grid.innerHTML = AUTOMATION_CATEGORIES.map(cat => {
    const count = rules.filter(r => r.category === cat).length;
    return `
      <div class="card">
        <div class="label">${cat}</div>
        <div class="num">${count}</div>
        <div class="trend" style="color:var(--muted)">Not connected · API-ready</div>
      </div>
    `;
  }).join("");
}

function renderAutomationHub(){
  populateAutomationDropdowns();
  renderAutomationCategoryGrid();
  renderAutomationRules();
}

function renderAutomationRules(){

  const list = document.getElementById("automationRulesList");
  if(!list) return;

  const clients = JSON.parse(localStorage.getItem("nexttech_clients") || "[]");
  const rules = JSON.parse(localStorage.getItem("nexttech_automation_rules") || "[]");

  const clientFilter = document.getElementById("automationClientFilter")?.value || "All";
  const categoryFilter = document.getElementById("automationCategoryFilter")?.value || "All";

  const filtered = rules.filter(r => {
    if(clientFilter !== "All" && String(r.clientId) !== String(clientFilter)) return false;
    if(categoryFilter !== "All" && r.category !== categoryFilter) return false;
    return true;
  });

  const countEl = document.getElementById("automationCount");
  if(countEl) countEl.textContent = filtered.length + " automation" + (filtered.length === 1 ? "" : "s");

  if(filtered.length === 0){
    list.innerHTML = `
      <div class="empty-crm">
        <div class="empty-icon">⚡</div>
        <h3>No automations yet</h3>
        <p>Build your first trigger → action workflow.</p>
        <button class="btn" onclick="openAutomationModal()">+ New Automation</button>
      </div>
    `;
    return;
  }

  list.innerHTML = filtered.map(rule => {
    const client = clients.find(c => String(c.id) === String(rule.clientId));
    return `
      <div class="panel" style="margin-bottom:12px;padding:16px">
        <div class="panel-head">
          <div>
            <h3 style="margin-bottom:4px">${rule.name}</h3>
            <span class="small">${client ? client.business : "Unknown client"} · ${rule.category}</span>
          </div>
          <span class="pill" style="${rule.active ? "" : "background:#2a1c22;color:#ff8585"}">${rule.active ? "Active" : "Paused"}</span>
        </div>
        <div class="workflow" style="margin-top:12px">
          <div class="node">🎯 Trigger<br><b>${rule.trigger}</b></div>
          <div class="arrow">→</div>
          ${rule.condition ? `<div class="node">🔎 If<br><b>${rule.condition}</b></div><div class="arrow">→</div>` : ""}
          ${rule.delay ? `<div class="node">⏱ Wait<br><b>${rule.delay}</b></div><div class="arrow">→</div>` : ""}
          <div class="node">⚙ Action<br><b>${rule.action}</b></div>
        </div>
        <div style="display:flex;gap:8px;margin-top:14px">
          <button class="btn secondary" onclick="toggleAutomation(${rule.id})">${rule.active ? "Pause" : "Activate"}</button>
          <button class="btn secondary" onclick="editAutomation(${rule.id})">Edit</button>
          <button class="btn secondary" onclick="deleteAutomation(${rule.id})">Delete</button>
        </div>
      </div>
    `;
  }).join("");
}

function openAutomationModal(){
  editingAutomationId = null;
  document.getElementById("automationModalTitle").textContent = "New Automation";
  populateAutomationDropdowns();

  document.getElementById("autoName").value = "";
  document.getElementById("autoCondition").value = "";
  document.getElementById("autoDelay").value = "";
  document.getElementById("autoActive").checked = true;

  if(currentClientId){
    document.getElementById("autoClient").value = currentClientId;
  }

  document.getElementById("automationModal").classList.add("show");
}

function closeAutomationModal(){
  document.getElementById("automationModal").classList.remove("show");
}

function saveAutomation(){

  const name = document.getElementById("autoName").value.trim();
  const clientId = document.getElementById("autoClient").value;
  const category = document.getElementById("autoCategory").value;
  const trigger = document.getElementById("autoTrigger").value;
  const condition = document.getElementById("autoCondition").value.trim();
  const action = document.getElementById("autoAction").value;
  const delay = document.getElementById("autoDelay").value.trim();
  const active = document.getElementById("autoActive").checked;

  if(!name || !clientId){
    alert("Please enter a name and select a client.");
    return;
  }

  const rules = JSON.parse(localStorage.getItem("nexttech_automation_rules") || "[]");

  if(editingAutomationId){
    const rule = rules.find(r => String(r.id) === String(editingAutomationId));
    if(rule){
      Object.assign(rule, { name, clientId, category, trigger, condition, action, delay, active,
        updatedAt: new Date().toISOString() });
    }
    editingAutomationId = null;
  }else{
    rules.push({
      id: Date.now(),
      clientId, name, category, trigger, condition, action, delay, active,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  localStorage.setItem("nexttech_automation_rules", JSON.stringify(rules));

  closeAutomationModal();
  renderAutomationHub();
}

function editAutomation(id){

  const rules = JSON.parse(localStorage.getItem("nexttech_automation_rules") || "[]");
  const rule = rules.find(r => String(r.id) === String(id));
  if(!rule) return;

  editingAutomationId = id;
  populateAutomationDropdowns();

  document.getElementById("automationModalTitle").textContent = "Edit Automation";
  document.getElementById("autoName").value = rule.name;
  document.getElementById("autoClient").value = rule.clientId;
  document.getElementById("autoCategory").value = rule.category;
  document.getElementById("autoTrigger").value = rule.trigger;
  document.getElementById("autoCondition").value = rule.condition || "";
  document.getElementById("autoAction").value = rule.action;
  document.getElementById("autoDelay").value = rule.delay || "";
  document.getElementById("autoActive").checked = !!rule.active;

  document.getElementById("automationModal").classList.add("show");
}

function toggleAutomation(id){
  const rules = JSON.parse(localStorage.getItem("nexttech_automation_rules") || "[]");
  const rule = rules.find(r => String(r.id) === String(id));
  if(!rule) return;
  rule.active = !rule.active;
  localStorage.setItem("nexttech_automation_rules", JSON.stringify(rules));
  renderAutomationRules();
}

function deleteAutomation(id){
  if(!confirm("Delete this automation?")) return;
  let rules = JSON.parse(localStorage.getItem("nexttech_automation_rules") || "[]");
  rules = rules.filter(r => String(r.id) !== String(id));
  localStorage.setItem("nexttech_automation_rules", JSON.stringify(rules));
  renderAutomationHub();
}

/* ===================== LIVE DASHBOARD STATS ===================== */

function renderDashboardStats(){

  const dash = document.getElementById("dashboard");
  if(!dash) return;

  const clients = JSON.parse(localStorage.getItem("nexttech_clients") || "[]");
  const leads = JSON.parse(localStorage.getItem("nexttech_leads") || "[]");
  const customers = JSON.parse(localStorage.getItem("nexttech_customers") || "[]");
  const rules = JSON.parse(localStorage.getItem("nexttech_automation_rules") || "[]");

  const activeClients = clients.filter(c => c.status === "Active").length;

  const today = new Date();
  today.setHours(0,0,0,0);

  let dueToday = 0, overdue = 0;
  leads.forEach(l => {
    if(!l.followup) return;
    const d = new Date(l.followup);
    d.setHours(0,0,0,0);
    const diff = Math.ceil((d - today) / (1000*60*60*24));
    if(diff === 0) dueToday++;
    else if(diff < 0) overdue++;
  });

  const converted = leads.filter(l => l.status === "Converted").length;
  const conversionRate = leads.length ? Math.round((converted / leads.length) * 100) : 0;

  const statEls = {
    dashActiveClients: activeClients,
    dashTotalLeads: leads.length,
    dashCustomers: customers.length,
    dashActiveAutomations: rules.filter(r => r.active).length,
    dashDueToday: dueToday,
    dashOverdue: overdue,
    dashConversionRate: conversionRate + "%"
  };

  Object.keys(statEls).forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = statEls[id];
  });
}

document.addEventListener("DOMContentLoaded", renderDashboardStats);
if(document.readyState !== "loading") renderDashboardStats();
