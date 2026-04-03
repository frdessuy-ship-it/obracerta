const defaultProjectConfig = {
  name: "Casa Bairro Universitario",
  saleTarget: 350000,
  landValue: 90000,
  areaSquareMeters: 70,
};

const defaultBrandConfig = {
  eyebrow: "Controle de custos",
  title: "ObraCerta",
  description: "Acompanhe custos, fornecedores, categorias e resultado financeiro da obra em um so lugar.",
};

const categories = [
  "Taxas",
  "Eletrica",
  "Hidraulica",
  "Mao de obra",
  "Material de construcao",
  "Frete",
  "Pintura",
  "Aberturas",
  "Agua",
  "Luz",
  "Documentacao",
  "Terreno",
];

const defaultSuppliers = [
  {
    id: crypto.randomUUID(),
    name: "Chico Ortiz",
    tradeName: "",
    cnpj: "",
    stateRegistration: "",
    email: "",
    phone: "",
    mobile: "",
    zipCode: "",
    address: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    notes: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Construcao Nota 10",
    tradeName: "",
    cnpj: "",
    stateRegistration: "",
    email: "",
    phone: "",
    mobile: "",
    zipCode: "",
    address: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    notes: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Prefeitura Ijui",
    tradeName: "",
    cnpj: "",
    stateRegistration: "",
    email: "",
    phone: "",
    mobile: "",
    zipCode: "",
    address: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    notes: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Registro de imoveis",
    tradeName: "",
    cnpj: "",
    stateRegistration: "",
    email: "",
    phone: "",
    mobile: "",
    zipCode: "",
    address: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    notes: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Volnei",
    tradeName: "",
    cnpj: "",
    stateRegistration: "",
    email: "",
    phone: "",
    mobile: "",
    zipCode: "",
    address: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    notes: "",
  },
];

const initialExpenses = [
  {
    id: crypto.randomUUID(),
    date: "2026-02-18",
    category: "Taxas",
    supplier: "Prefeitura Ijui",
    description: "Imposto de transmissao do imovel",
    quantity: 1,
    unitValue: 1265.55,
    invoice: "182",
    notes: "Valor trazido da planilha original.",
  },
  {
    id: crypto.randomUUID(),
    date: "2026-02-19",
    category: "Documentacao",
    supplier: "Registro de imoveis",
    description: "Certidao de inteiro teor da matricula",
    quantity: 1,
    unitValue: 121.54,
    invoice: "209246",
    notes: "",
  },
  {
    id: crypto.randomUUID(),
    date: "2026-02-19",
    category: "Documentacao",
    supplier: "Registro de imoveis",
    description: "Certidao negativa de bens",
    quantity: 1,
    unitValue: 47.65,
    invoice: "209247",
    notes: "",
  },
  {
    id: crypto.randomUUID(),
    date: "2026-03-01",
    category: "Terreno",
    supplier: "Chico Ortiz",
    description: "Pagamento principal do terreno",
    quantity: 1,
    unitValue: 90000,
    invoice: "",
    notes: "Lancamento de referencia para a composicao total da obra.",
  },
  {
    id: crypto.randomUUID(),
    date: "2026-03-03",
    category: "Mao de obra",
    supplier: "Volnei",
    description: "Etapa inicial de mao de obra",
    quantity: 1,
    unitValue: 25000,
    invoice: "",
    notes: "",
  },
  {
    id: crypto.randomUUID(),
    date: "2026-03-08",
    category: "Material de construcao",
    supplier: "Construcao Nota 10",
    description: "Compra de argamassa para revestimento",
    quantity: 54,
    unitValue: 1,
    invoice: "",
    notes: "Exemplo inspirado na aba de graficos.",
  },
];

const SUPABASE_TABLE = "app_state";
const defaultCloudConfig = {
  url: "",
  anonKey: "",
  stateId: "main",
  accessKey: "",
};

const CITY_API_BASE_URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
const cityOptionsCache = new Map();
const CLOUD_ACCESS_KEY_STORAGE = "obra-certa-cloud-access-key";
const CLOUD_POLL_INTERVAL_MS = 15000;

const state = {
  expenses: loadExpenses().map(normalizeExpense),
  editingExpenseId: null,
  editingSupplierId: null,
  selectedSupplierId: null,
  supplierSearchTerm: "",
  currentView: "dashboard",
  projectConfig: loadProjectConfig(),
  suppliers: loadSuppliers(),
  brandConfig: loadBrandConfig(),
  reportDrillSupplier: null,
  graphDrill: {
    category: null,
    supplier: null,
  },
  cloud: createCloudState(),
};

const elements = {
  saleTargetCard: document.querySelector("#saleTargetCard"),
  landValue: document.querySelector("#landValue"),
  totalSpent: document.querySelector("#totalSpent"),
  totalProjectCost: document.querySelector("#totalProjectCost"),
  costPerSquareMeter: document.querySelector("#costPerSquareMeter"),
  profitValue: document.querySelector("#profitValue"),
  profitMargin: document.querySelector("#profitMargin"),
  saleTargetCardButton: document.querySelector("#saleTargetCardButton"),
  sidebarDescriptionButton: document.querySelector("#sidebarDescriptionButton"),
  brandEyebrow: document.querySelector("#brandEyebrow"),
  brandTitle: document.querySelector("#brandTitle"),
  brandDescription: document.querySelector("#brandDescription"),
  brandEditorOverlay: document.querySelector("#brandEditorOverlay"),
  brandForm: document.querySelector("#brandForm"),
  brandEyebrowInput: document.querySelector("#brandEyebrowInput"),
  brandTitleInput: document.querySelector("#brandTitleInput"),
  brandDescriptionInput: document.querySelector("#brandDescriptionInput"),
  cancelBrandEditButton: document.querySelector("#cancelBrandEditButton"),
  landValueCard: document.querySelector("#landValueCard"),
  projectAreaCard: document.querySelector("#projectAreaCard"),
  projectAreaValue: document.querySelector("#projectAreaValue"),
  supplierForm: document.querySelector("#supplierForm"),
  supplierName: document.querySelector("#supplierName"),
  supplierTradeName: document.querySelector("#supplierTradeName"),
  supplierCnpj: document.querySelector("#supplierCnpj"),
  supplierStateRegistration: document.querySelector("#supplierStateRegistration"),
  supplierEmail: document.querySelector("#supplierEmail"),
  supplierPhone: document.querySelector("#supplierPhone"),
  supplierMobile: document.querySelector("#supplierMobile"),
  supplierZipCode: document.querySelector("#supplierZipCode"),
  supplierAddress: document.querySelector("#supplierAddress"),
  supplierNumber: document.querySelector("#supplierNumber"),
  supplierComplement: document.querySelector("#supplierComplement"),
  supplierDistrict: document.querySelector("#supplierDistrict"),
  supplierCity: document.querySelector("#supplierCity"),
  supplierCitySuggestions: document.querySelector("#supplierCitySuggestions"),
  supplierState: document.querySelector("#supplierState"),
  supplierNotes: document.querySelector("#supplierNotes"),
  lookupZipCodeButton: document.querySelector("#lookupZipCodeButton"),
  lookupCnpjButton: document.querySelector("#lookupCnpjButton"),
  supplierSubmitButton: document.querySelector("#supplierSubmitButton"),
  cancelSupplierEditButton: document.querySelector("#cancelSupplierEditButton"),
  supplierFormModeBadge: document.querySelector("#supplierFormModeBadge"),
  supplierSearchInput: document.querySelector("#supplierSearchInput"),
  clearSupplierSearchButton: document.querySelector("#clearSupplierSearchButton"),
  supplierDirectorySummary: document.querySelector("#supplierDirectorySummary"),
  supplierDirectoryList: document.querySelector("#supplierDirectoryList"),
  supplierDetailCard: document.querySelector("#supplierDetailCard"),
  graphSummary: document.querySelector("#graphSummary"),
  graphMainTitle: document.querySelector("#graphMainTitle"),
  graphBackButton: document.querySelector("#graphBackButton"),
  graphDetailTitle: document.querySelector("#graphDetailTitle"),
  graphDetailSummary: document.querySelector("#graphDetailSummary"),
  graphDetailBody: document.querySelector("#graphDetailBody"),
  expenseForm: document.querySelector("#expenseForm"),
  invoiceXmlInput: document.querySelector("#invoiceXmlInput"),
  importXmlButton: document.querySelector("#importXmlButton"),
  addExpenseItemButton: document.querySelector("#addExpenseItemButton"),
  expenseItemsBody: document.querySelector("#expenseItemsBody"),
  expenseItemsTotal: document.querySelector("#expenseItemsTotal"),
  expenseDate: document.querySelector("#expenseDate"),
  expenseSupplier: document.querySelector("#expenseSupplier"),
  expenseInvoice: document.querySelector("#expenseInvoice"),
  expenseNotes: document.querySelector("#expenseNotes"),
  submitButton: document.querySelector("#submitButton"),
  cancelEditButton: document.querySelector("#cancelEditButton"),
  formModeBadge: document.querySelector("#formModeBadge"),
  reportSummary: document.querySelector("#reportSummary"),
  filterDateFrom: document.querySelector("#filterDateFrom"),
  filterDateTo: document.querySelector("#filterDateTo"),
  filterCategory: document.querySelector("#filterCategory"),
  filterSupplier: document.querySelector("#filterSupplier"),
  filterSearch: document.querySelector("#filterSearch"),
  clearFiltersButton: document.querySelector("#clearFiltersButton"),
  reportSuppliersList: document.querySelector("#reportSuppliersList"),
  expensesTableBody: document.querySelector("#expensesTableBody"),
  navLinks: [...document.querySelectorAll("[data-view]")],
  viewPanels: [...document.querySelectorAll("[data-view-panel]")],
};

bootstrap();

async function bootstrap() {
  fillBrandForm();
  fillCategorySelects();
  ensureSuppliersFromExpenses();
  bindEvents();
  setExpenseItems([createEmptyExpenseItem()]);
  render();
  await initializeCloudSync();
}

function bindEvents() {
  elements.sidebarDescriptionButton.addEventListener("click", openBrandEditor);
  elements.brandForm.addEventListener("submit", handleBrandSubmit);
  elements.cancelBrandEditButton.addEventListener("click", closeBrandEditor);
  elements.brandEditorOverlay.addEventListener("click", (event) => {
    if (event.target === elements.brandEditorOverlay) {
      closeBrandEditor();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.brandEditorOverlay.hidden) {
      closeBrandEditor();
    }
  });
  elements.importXmlButton.addEventListener("click", () => elements.invoiceXmlInput.click());
  elements.invoiceXmlInput.addEventListener("change", handleInvoiceXmlImport);
  elements.addExpenseItemButton.addEventListener("click", () => {
    appendExpenseItemRow();
    syncExpenseItemsTotal();
  });
  elements.saleTargetCardButton.addEventListener("click", editSaleTarget);
  elements.landValueCard.addEventListener("click", editLandValue);
  elements.projectAreaCard.addEventListener("click", editProjectArea);
  elements.lookupZipCodeButton.addEventListener("click", handleZipCodeLookup);
  elements.lookupCnpjButton.addEventListener("click", handleCnpjLookup);
  elements.supplierForm.addEventListener("submit", handleSupplierSubmit);
  elements.cancelSupplierEditButton.addEventListener("click", resetSupplierForm);
  elements.supplierState.addEventListener("input", handleSupplierStateInput);
  elements.supplierState.addEventListener("blur", handleSupplierStateBlur);
  elements.supplierCity.addEventListener("focus", handleSupplierCityFocus);
  elements.supplierZipCode.addEventListener("blur", handleSupplierZipCodeBlur);
  elements.supplierSearchInput.addEventListener("input", handleSupplierSearchChange);
  elements.clearSupplierSearchButton.addEventListener("click", clearSupplierSearch);
  elements.expenseForm.addEventListener("submit", handleExpenseSubmit);
  elements.cancelEditButton.addEventListener("click", resetForm);
  elements.filterDateFrom.addEventListener("change", handleReportFilterChange);
  elements.filterDateTo.addEventListener("change", handleReportFilterChange);
  elements.filterCategory.addEventListener("change", handleReportFilterChange);
  elements.filterSupplier.addEventListener("change", handleReportFilterChange);
  elements.filterSearch.addEventListener("input", handleReportFilterChange);
  elements.clearFiltersButton.addEventListener("click", clearReportFilters);
  elements.graphBackButton.addEventListener("click", stepBackGraphDrill);
  elements.navLinks.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });
}

function createCloudState() {
  const config = {
    ...defaultCloudConfig,
    ...(window.OBRA_CERTA_SUPABASE || {}),
  };

  return {
    config,
    client: null,
    enabled: false,
    applyingRemote: false,
    syncTimer: null,
    pollTimer: null,
    lastSignature: "",
  };
}

function isCloudConfigured() {
  const { url, anonKey } = state.cloud.config;
  return Boolean(url && anonKey && window.supabase?.createClient);
}

async function initializeCloudSync() {
  if (!isCloudConfigured()) {
    return;
  }

  try {
    await ensureCloudAccessKey();
    if (!state.cloud.config.accessKey) {
      return;
    }

    state.cloud.client = window.supabase.createClient(
      state.cloud.config.url,
      state.cloud.config.anonKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        global: {
          headers: {
            "x-obra-certa-key": state.cloud.config.accessKey,
          },
        },
      }
    );

    state.cloud.enabled = true;

    const { data, error } = await state.cloud.client
      .from(SUPABASE_TABLE)
      .select("id, payload")
      .eq("id", state.cloud.config.stateId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (data?.payload) {
      applyCloudSnapshot(data.payload);
      persistAllLocal();
      render();
    } else {
      await saveCloudStateNow();
    }

    startCloudPolling();
  } catch (error) {
    console.error("Falha ao iniciar sincronizacao com Supabase.", error);
    state.cloud.enabled = false;
    state.cloud.client = null;
  }
}

function startCloudPolling() {
  if (!state.cloud.client) {
    return;
  }

  window.clearInterval(state.cloud.pollTimer);
  state.cloud.pollTimer = window.setInterval(() => {
    void refreshCloudState();
  }, CLOUD_POLL_INTERVAL_MS);
}

function queueCloudSync() {
  if (!state.cloud.enabled || state.cloud.applyingRemote) {
    return;
  }

  window.clearTimeout(state.cloud.syncTimer);
  state.cloud.syncTimer = window.setTimeout(() => {
    void saveCloudStateNow();
  }, 300);
}

async function refreshCloudState() {
  if (!state.cloud.enabled || !state.cloud.client || state.cloud.applyingRemote) {
    return;
  }

  const { data, error } = await state.cloud.client
    .from(SUPABASE_TABLE)
    .select("id, payload")
    .eq("id", state.cloud.config.stateId)
    .maybeSingle();

  if (error || !data?.payload) {
    return;
  }

  const nextSignature = createCloudSignature(data.payload);
  if (nextSignature === state.cloud.lastSignature) {
    return;
  }

  applyCloudSnapshot(data.payload);
  persistAllLocal();
  render();
}

async function saveCloudStateNow() {
  if (!state.cloud.enabled || !state.cloud.client) {
    return;
  }

  const payload = serializeCloudState();
  const signature = createCloudSignature(payload);
  state.cloud.lastSignature = signature;

  const { error } = await state.cloud.client.from(SUPABASE_TABLE).upsert(
    {
      id: state.cloud.config.stateId,
      payload,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "id",
    }
  );

  if (error) {
    console.error("Falha ao salvar dados online.", error);
  }
}

function serializeCloudState() {
  return {
    accessKey: state.cloud.config.accessKey,
    expenses: state.expenses,
    projectConfig: state.projectConfig,
    suppliers: state.suppliers,
    brandConfig: state.brandConfig,
  };
}

function applyCloudSnapshot(payload) {
  state.cloud.applyingRemote = true;
  try {
    state.expenses = (payload.expenses || initialExpenses).map(normalizeExpense);
    state.projectConfig = { ...defaultProjectConfig, ...(payload.projectConfig || {}) };
    state.suppliers = normalizeSuppliers(payload.suppliers);
    state.brandConfig = { ...defaultBrandConfig, ...(payload.brandConfig || {}) };

    ensureSuppliersFromExpenses();
    resetForm();
    resetSupplierForm();
    fillBrandForm();
    state.cloud.lastSignature = createCloudSignature(serializeCloudState());
  } finally {
    state.cloud.applyingRemote = false;
  }
}

function createCloudSignature(payload) {
  return JSON.stringify(payload);
}

async function ensureCloudAccessKey() {
  const configuredKey = state.cloud.config.accessKey?.trim();
  if (configuredKey) {
    state.cloud.config.accessKey = configuredKey;
    localStorage.setItem(CLOUD_ACCESS_KEY_STORAGE, configuredKey);
    return;
  }

  const savedKey = localStorage.getItem(CLOUD_ACCESS_KEY_STORAGE)?.trim();
  if (savedKey) {
    state.cloud.config.accessKey = savedKey;
    return;
  }

  const promptedKey = window.prompt(
    "Informe a chave de sincronizacao do ObraCerta para conectar este aparelho:"
  );

  const normalizedKey = promptedKey?.trim();
  if (!normalizedKey) {
    window.alert("Sincronizacao online desativada neste aparelho. Defina a chave para reativar.");
    return;
  }

  state.cloud.config.accessKey = normalizedKey;
  localStorage.setItem(CLOUD_ACCESS_KEY_STORAGE, normalizedKey);
}

function fillCategorySelects() {
  const categoryOptions = ['<option value="">Todas</option>']
    .concat(categories.map((category) => `<option value="${category}">${category}</option>`))
    .join("");

  elements.filterCategory.innerHTML = categoryOptions;
}

function fillSupplierSelect() {
  const currentValue = elements.expenseSupplier.value;
  elements.expenseSupplier.innerHTML = ['<option value="">Selecione</option>']
    .concat(
      state.suppliers
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((supplier) => `<option value="${supplier.name}">${supplier.name}</option>`)
    )
    .join("");

  if (state.suppliers.some((supplier) => supplier.name === currentValue)) {
    elements.expenseSupplier.value = currentValue;
  }
}

function handleExpenseSubmit(event) {
  event.preventDefault();

  const items = collectExpenseItems();
  if (!items.length) {
    window.alert("Adicione pelo menos um item na nota.");
    return;
  }

  const expenseBase = {
    date: elements.expenseDate.value,
    supplier: elements.expenseSupplier.value.trim(),
    invoice: elements.expenseInvoice.value.trim(),
    notes: elements.expenseNotes.value.trim(),
  };

  if (state.editingExpenseId) {
    const editingExpense = state.expenses.find((expense) => expense.id === state.editingExpenseId);
    const groupId = editingExpense?.invoiceGroupId || crypto.randomUUID();
    state.expenses = state.expenses.filter(
      (expense) => expense.id !== state.editingExpenseId && expense.invoiceGroupId !== groupId
    );
    state.expenses = [
      ...items.map((item) => ({
        id: crypto.randomUUID(),
        invoiceGroupId: groupId,
        ...expenseBase,
        ...item,
      })),
      ...state.expenses,
    ];
  } else {
    const groupId = crypto.randomUUID();
    state.expenses = [
      ...items.map((item) => ({
        id: crypto.randomUUID(),
        invoiceGroupId: groupId,
        ...expenseBase,
        ...item,
      })),
      ...state.expenses,
    ];
  }

  persistExpenses();
  resetForm();
  render();
}

function handleBrandSubmit(event) {
  event.preventDefault();
  state.brandConfig = {
    eyebrow: elements.brandEyebrowInput.value.trim(),
    title: elements.brandTitleInput.value.trim(),
    description: elements.brandDescriptionInput.value.trim(),
  };
  persistBrandConfig();
  render();
  closeBrandEditor();
}

async function handleInvoiceXmlImport(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  try {
    const xmlText = await file.text();
      const imported = parseInvoiceXml(xmlText);

      elements.expenseDate.value = imported.date || elements.expenseDate.value || today();
      elements.expenseInvoice.value = imported.invoice || "";
      setExpenseItems(imported.items);

      if (imported.supplier) {
        const normalizedSupplier = normalizeSupplierName(imported.supplier);
        ensureSupplierExists(normalizedSupplier);
        elements.expenseSupplier.value = normalizedSupplier;
      }

      syncExpenseItemsTotal();
      setView("lancamentos");
  } catch (error) {
    window.alert("Nao foi possivel importar esse XML. Verifique se e um XML de NF-e valido.");
  } finally {
    elements.invoiceXmlInput.value = "";
  }
}

function handleSupplierSubmit(event) {
  event.preventDefault();
  const normalizedState = normalizeStateCode(elements.supplierState.value);
  const normalizedCity = elements.supplierCity.value.trim();
  const supplierName = normalizeSupplierName(elements.supplierName.value);
  let savedSupplierId = state.editingSupplierId;

  if (!supplierName) {
    return;
  }

  elements.supplierState.value = normalizedState;

  if (normalizedState && normalizedCity && !isKnownCityForState(normalizedState, normalizedCity)) {
    window.alert(`A cidade informada nao foi encontrada para o estado ${normalizedState}.`);
    elements.supplierCity.focus();
    return;
  }

  const duplicate = state.suppliers.find(
    (supplier) =>
      supplier.name.toLowerCase() === supplierName.toLowerCase() &&
      supplier.id !== state.editingSupplierId
  );

  if (duplicate) {
    return;
  }

    if (state.editingSupplierId) {
      const previousSupplier = state.suppliers.find((supplier) => supplier.id === state.editingSupplierId);
      state.suppliers = state.suppliers
        .map((supplier) =>
          supplier.id === state.editingSupplierId
            ? {
                ...supplier,
                name: supplierName,
                tradeName: elements.supplierTradeName.value.trim(),
                cnpj: elements.supplierCnpj.value.trim(),
                stateRegistration: elements.supplierStateRegistration.value.trim(),
                email: elements.supplierEmail.value.trim(),
                phone: elements.supplierPhone.value.trim(),
                mobile: elements.supplierMobile.value.trim(),
                zipCode: elements.supplierZipCode.value.trim(),
                address: elements.supplierAddress.value.trim(),
                number: elements.supplierNumber.value.trim(),
                complement: elements.supplierComplement.value.trim(),
                district: elements.supplierDistrict.value.trim(),
                city: normalizedCity,
                state: normalizedState,
                notes: elements.supplierNotes.value.trim(),
              }
            : supplier
        )
        .sort((a, b) => a.name.localeCompare(b.name));

    if (previousSupplier && previousSupplier.name !== supplierName) {
      state.expenses = state.expenses.map((expense) =>
        expense.supplier === previousSupplier.name ? { ...expense, supplier: supplierName } : expense
      );
      persistExpenses();
    }
  } else {
    savedSupplierId = crypto.randomUUID();
    state.suppliers = [
        ...state.suppliers,
        {
          id: savedSupplierId,
          name: supplierName,
          tradeName: elements.supplierTradeName.value.trim(),
          cnpj: elements.supplierCnpj.value.trim(),
          stateRegistration: elements.supplierStateRegistration.value.trim(),
          email: elements.supplierEmail.value.trim(),
          phone: elements.supplierPhone.value.trim(),
          mobile: elements.supplierMobile.value.trim(),
          zipCode: elements.supplierZipCode.value.trim(),
          address: elements.supplierAddress.value.trim(),
          number: elements.supplierNumber.value.trim(),
          complement: elements.supplierComplement.value.trim(),
          district: elements.supplierDistrict.value.trim(),
          city: normalizedCity,
          state: normalizedState,
          notes: elements.supplierNotes.value.trim(),
        },
      ].sort((a, b) => a.name.localeCompare(b.name));
  }

  persistSuppliers();
  state.selectedSupplierId = savedSupplierId || state.selectedSupplierId;
  resetSupplierForm();
  ensureSelectedSupplierIsVisible();
  render();
}

function render() {
  renderBrandBlock();
  elements.expenseDate.value ||= today();
  fillSupplierSelect();
  renderSupplierFormState();
  renderSupplierDirectory();
  renderSuppliersOverview();
  renderDashboard();
  renderSummaries();
  renderGraphDetail();
  renderSupplierFilter();
  renderFormState();
  renderView();
  renderTable();
}

function handleSupplierSearchChange(event) {
  state.supplierSearchTerm = event.target.value.trim();
  ensureSelectedSupplierIsVisible();
  renderSupplierDirectory();
}

function clearSupplierSearch() {
  state.supplierSearchTerm = "";
  elements.supplierSearchInput.value = "";
  ensureSelectedSupplierIsVisible();
  renderSupplierDirectory();
}

function handleSupplierStateInput() {
  const normalizedState = normalizeStateCode(elements.supplierState.value);
  elements.supplierState.value = normalizedState;

  if (normalizedState.length < 2) {
    renderCitySuggestions([]);
  }
}

function handleSupplierStateBlur() {
  void loadCitiesForSelectedState();
}

function handleSupplierCityFocus() {
  if (!elements.supplierState.value.trim()) {
    return;
  }

  void loadCitiesForSelectedState();
}

function handleSupplierZipCodeBlur() {
  elements.supplierZipCode.value = formatZipCode(elements.supplierZipCode.value.trim());
}

function renderBrandBlock() {
  elements.brandEyebrow.textContent = state.brandConfig.eyebrow;
  elements.brandTitle.textContent = state.brandConfig.title;
  elements.brandDescription.textContent = state.brandConfig.description;
}

function renderView() {
  elements.navLinks.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.currentView);
  });

  elements.viewPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.viewPanel === state.currentView);
  });
}

function setView(view) {
  state.currentView = view;
  renderView();
}

function renderFormState() {
  const isEditing = Boolean(state.editingExpenseId);
  elements.submitButton.textContent = isEditing ? "Salvar alteracoes" : "Salvar lancamento";
  elements.cancelEditButton.hidden = !isEditing;
  elements.formModeBadge.textContent = isEditing ? "Modo edicao" : "Modo criacao";
  syncExpenseItemsTotal();
}

function renderDashboard() {
  const constructionCost = state.expenses.reduce((sum, expense) => sum + getExpenseTotal(expense), 0);
  const totalProjectCost = state.projectConfig.landValue + constructionCost;
  const profitValue = state.projectConfig.saleTarget - totalProjectCost;
  const profitMargin =
    state.projectConfig.saleTarget > 0 ? (profitValue / state.projectConfig.saleTarget) * 100 : 0;
  const costPerSquareMeter =
    state.projectConfig.areaSquareMeters > 0 ? constructionCost / state.projectConfig.areaSquareMeters : 0;

  elements.saleTargetCard.textContent = formatCurrency(state.projectConfig.saleTarget);
  elements.landValue.textContent = formatCurrency(state.projectConfig.landValue);
  elements.projectAreaValue.textContent = `${formatNumber(state.projectConfig.areaSquareMeters)} m2`;
  elements.totalSpent.textContent = formatCurrency(constructionCost);
  elements.totalProjectCost.textContent = formatCurrency(totalProjectCost);
  elements.costPerSquareMeter.textContent = formatCurrency(costPerSquareMeter);
  elements.profitValue.textContent = formatCurrency(profitValue);
  elements.profitMargin.textContent = formatPercent(profitMargin);
}

function renderSupplierDirectory() {
  elements.supplierSearchInput.value = state.supplierSearchTerm;
  ensureSelectedSupplierIsVisible();
  const filteredSuppliers = getSupplierDirectoryMatches();
  const selectedSupplier = filteredSuppliers.find((supplier) => supplier.id === state.selectedSupplierId) || null;

  elements.supplierDirectorySummary.textContent = `${filteredSuppliers.length} fornecedor(es)`;

  if (!filteredSuppliers.length) {
    elements.supplierDirectoryList.innerHTML = `
      <div class="supplier-directory-empty">Nenhum fornecedor encontrado com esse filtro.</div>
    `;
    elements.supplierDetailCard.innerHTML = `
      <div class="empty-state">Ajuste a busca ou limpe o filtro para ver os cadastros.</div>
    `;
    return;
  }

  elements.supplierDirectoryList.innerHTML = filteredSuppliers
    .map((supplier) => {
      const isActive = supplier.id === selectedSupplier?.id;
      return `
        <button
          type="button"
          class="supplier-directory-item${isActive ? " is-active" : ""}"
          data-open-supplier-card="${supplier.id}"
        >
          <div class="supplier-directory-top">
            <div>
              <strong>${escapeHtml(supplier.name)}</strong>
              <small>${escapeHtml(supplier.tradeName || "Clique para visualizar os detalhes")}</small>
            </div>
            <span>${formatCurrency(getSpentBySupplier(supplier.name))}</span>
          </div>
          <div class="supplier-directory-meta">
            <span>${escapeHtml(supplier.city || "-")} / ${escapeHtml(supplier.state || "-")}</span>
            <span>${escapeHtml(supplier.cnpj || "Sem CNPJ")}</span>
            <span>${escapeHtml(supplier.phone || supplier.mobile || "Sem telefone")}</span>
          </div>
        </button>
      `;
    })
    .join("");

  elements.supplierDirectoryList.querySelectorAll("[data-open-supplier-card]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedSupplierId = button.dataset.openSupplierCard;
      renderSupplierDirectory();
    });
  });

  renderSupplierDetailCard(selectedSupplier || filteredSuppliers[0]);
}

function renderSupplierDetailCard(supplier) {
  if (!supplier) {
    elements.supplierDetailCard.innerHTML = `
      <div class="empty-state">Selecione um fornecedor na lista para visualizar os detalhes.</div>
    `;
    return;
  }

  if (state.selectedSupplierId !== supplier.id) {
    state.selectedSupplierId = supplier.id;
  }

  const launches = state.expenses.filter((expense) => expense.supplier === supplier.name).length;

  elements.supplierDetailCard.innerHTML = `
    <div class="supplier-detail-header">
      <div class="supplier-detail-top">
        <div>
          <p class="eyebrow">Visualizacao do fornecedor</p>
          <h3>${escapeHtml(supplier.name)}</h3>
          <small>${escapeHtml(supplier.tradeName || "Sem nome fantasia cadastrado")}</small>
        </div>
        <div class="supplier-detail-total">
          <span>Total lancado</span>
          <strong>${formatCurrency(getSpentBySupplier(supplier.name))}</strong>
          <small>${launches} lancamento(s)</small>
        </div>
      </div>
    </div>

    <div class="supplier-detail-meta">
      ${renderSupplierDetailField("CNPJ", supplier.cnpj)}
      ${renderSupplierDetailField("IE", supplier.stateRegistration)}
      ${renderSupplierDetailField("Email", supplier.email)}
      ${renderSupplierDetailField("Telefone", supplier.phone)}
      ${renderSupplierDetailField("Celular", supplier.mobile)}
      ${renderSupplierDetailField("CEP", supplier.zipCode)}
      ${renderSupplierDetailField("Endereco", formatAddressLine(supplier), true)}
      ${renderSupplierDetailField("Cidade / UF", formatCityStateLine(supplier))}
      ${renderSupplierDetailField("Observacoes", supplier.notes, true)}
    </div>

    <div class="supplier-detail-actions">
      <button type="button" class="primary-button" data-edit-directory-supplier="${supplier.id}">Editar fornecedor</button>
      <button type="button" class="secondary-button" data-delete-directory-supplier="${supplier.id}">Excluir fornecedor</button>
    </div>
  `;

  elements.supplierDetailCard
    .querySelector('[data-edit-directory-supplier]')
    .addEventListener("click", () => startSupplierEdit(supplier.id));

  elements.supplierDetailCard
    .querySelector('[data-delete-directory-supplier]')
    .addEventListener("click", () => deleteSupplier(supplier.id));
}

function renderSupplierDetailField(label, value, isFullWidth = false) {
  const normalizedValue = value && value !== "-" ? value : "Nao informado";
  return `
    <div class="supplier-detail-field${isFullWidth ? " full-width" : ""}">
      <label>${label}</label>
      <span>${escapeHtml(normalizedValue)}</span>
    </div>
  `;
}

function getSupplierDirectoryMatches() {
  const searchTerm = normalizeSearchText(state.supplierSearchTerm);
  const suppliers = state.suppliers
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  if (!searchTerm) {
    return suppliers;
  }

  return suppliers.filter((supplier) => {
    const haystack = normalizeSearchText([
      supplier.name,
      supplier.tradeName,
      supplier.cnpj,
      supplier.email,
      supplier.phone,
      supplier.mobile,
      supplier.city,
      supplier.state,
    ].filter(Boolean).join(" "));

    return haystack.includes(searchTerm);
  });
}

function ensureSelectedSupplierIsVisible() {
  const filteredSuppliers = getSupplierDirectoryMatches();
  const hasCurrentSelection = filteredSuppliers.some((supplier) => supplier.id === state.selectedSupplierId);

  if (hasCurrentSelection) {
    return;
  }

  state.selectedSupplierId = filteredSuppliers[0]?.id || null;
}

function renderSummaries() {
  const totalConstructionCost = state.expenses.reduce((sum, expense) => sum + getExpenseTotal(expense), 0);

  let groupedExpenses = {};
  let emptyMessage = "Nenhuma categoria cadastrada ainda.";
  let groupKey = "category";
  let title = "Gastos por categoria";

  if (!state.graphDrill.category) {
    groupedExpenses = groupBy(state.expenses, "category");
  } else if (!state.graphDrill.supplier) {
    groupedExpenses = groupBy(
      state.expenses.filter((expense) => expense.category === state.graphDrill.category),
      "supplier"
    );
    emptyMessage = "Nenhum fornecedor encontrado para esta categoria.";
    groupKey = "supplier";
    title = `Fornecedores em ${state.graphDrill.category}`;
  } else {
    groupedExpenses = groupBy(
      state.expenses.filter(
        (expense) =>
          expense.category === state.graphDrill.category && expense.supplier === state.graphDrill.supplier
      ),
      "description"
    );
    emptyMessage = "Nenhum item encontrado para este fornecedor.";
    groupKey = "description";
    title = `Itens em ${state.graphDrill.supplier}`;
  }

  elements.graphMainTitle.textContent = title;
  elements.graphBackButton.hidden = !state.graphDrill.category;

  renderStackSummary(elements.graphSummary, groupedExpenses, emptyMessage, totalConstructionCost, groupKey);
}

function renderStackSummary(container, groups, emptyMessage, totalConstructionCost = 0, groupKey = "") {
  const entries = Object.entries(groups)
    .map(([name, expenses]) => ({
      name,
      total: expenses.reduce((sum, expense) => sum + getExpenseTotal(expense), 0),
      count: expenses.length,
    }))
    .sort((left, right) => right.total - left.total);

  if (!entries.length) {
    container.innerHTML = `<div class="empty-state">${emptyMessage}</div>`;
    return;
  }

  const biggest = entries[0].total;
  container.innerHTML = entries
    .map(
      (entry) => `
        <button type="button" class="stack-item stack-button" data-graph-key="${groupKey}" data-graph-value="${escapeHtml(entry.name)}">
          <div class="stack-item-top">
            <strong>${entry.name}</strong>
            <span>${formatCurrency(entry.total)} (${formatPercentValue(entry.total, totalConstructionCost)})</span>
          </div>
          <small>${entry.count} lancamento(s)</small>
          <div class="bar-track" aria-hidden="true">
            <div class="bar-fill" style="width: ${(entry.total / biggest) * 100}%"></div>
          </div>
        </button>
      `
    )
    .join("");

  container.querySelectorAll("[data-graph-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const isLeafSelection = applyGraphDrill(button.dataset.graphKey, button.dataset.graphValue);
      renderSummaries();
      if (!isLeafSelection) {
        renderGraphDetail();
      }
    });
  });
}

function renderGraphDetail() {
  const filtered = getGraphDetailExpenses();
  const detailLabel = getGraphDetailLabel();

  if (!filtered.length || !detailLabel) {
    elements.graphDetailTitle.textContent = "Clique em um item do grafico";
    elements.graphDetailSummary.textContent = "Sem selecao";
    elements.graphDetailBody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-state">Selecione uma categoria, fornecedor ou material para ver os lancamentos.</div>
        </td>
      </tr>
    `;
    return;
  }

  const sorted = filtered.sort((left, right) => right.date.localeCompare(left.date));
  const total = filtered.reduce((sum, expense) => sum + getExpenseTotal(expense), 0);

  elements.graphDetailTitle.textContent = detailLabel;
  elements.graphDetailSummary.textContent = `${filtered.length} lancamento(s)  -  ${formatCurrency(total)}`;

  elements.graphDetailBody.innerHTML = sorted
    .map(
      (expense) => `
        <tr>
          <td>${formatDate(expense.date)}</td>
          <td>${expense.category}</td>
          <td>${expense.supplier}</td>
          <td>${expense.description}</td>
          <td>${expense.invoice || "-"}</td>
          <td>${formatCurrency(getExpenseTotal(expense))}</td>
        </tr>
      `
    )
    .join("");
}

function applyGraphDrill(key, value) {
  if (key === "category") {
    state.graphDrill = {
      category: value,
      supplier: null,
    };
    return false;
  }

  if (key === "supplier" && state.graphDrill.category) {
    state.graphDrill = {
      ...state.graphDrill,
      supplier: value,
    };
    return false;
  }

  if (key === "description" && state.graphDrill.category && state.graphDrill.supplier) {
    renderGraphDetailForDescription(value);
    return true;
  }

  return false;
}

function getGraphDetailExpenses() {
  let filtered = [...state.expenses];

  if (state.graphDrill.category) {
    filtered = filtered.filter((expense) => expense.category === state.graphDrill.category);
  } else {
    return [];
  }

  if (state.graphDrill.supplier) {
    filtered = filtered.filter((expense) => expense.supplier === state.graphDrill.supplier);
  }

  return filtered;
}

function getGraphDetailLabel() {
  if (state.graphDrill.supplier) {
    return `Fornecedor: ${state.graphDrill.supplier}`;
  }

  if (state.graphDrill.category) {
    return `Categoria: ${state.graphDrill.category}`;
  }

  return "";
}

function renderGraphDetailForDescription(description) {
  const filtered = state.expenses
    .filter(
      (expense) =>
        expense.category === state.graphDrill.category &&
        expense.supplier === state.graphDrill.supplier &&
        expense.description === description
    )
    .sort((left, right) => right.date.localeCompare(left.date));
  const total = filtered.reduce((sum, expense) => sum + getExpenseTotal(expense), 0);

  elements.graphDetailTitle.textContent = `Item: ${description}`;
  elements.graphDetailSummary.textContent = `${filtered.length} lancamento(s)  -  ${formatCurrency(total)}`;

  elements.graphDetailBody.innerHTML = filtered.length
    ? filtered
        .map(
          (expense) => `
            <tr>
              <td>${formatDate(expense.date)}</td>
              <td>${expense.category}</td>
              <td>${expense.supplier}</td>
              <td>${expense.description}</td>
              <td>${expense.invoice || "-"}</td>
              <td>${formatCurrency(getExpenseTotal(expense))}</td>
            </tr>
          `
        )
        .join("")
    : `
      <tr>
        <td colspan="6">
          <div class="empty-state">Nenhum lancamento encontrado para este item.</div>
        </td>
      </tr>
    `;
}

function stepBackGraphDrill() {
  if (state.graphDrill.supplier) {
    state.graphDrill.supplier = null;
  } else if (state.graphDrill.category) {
    state.graphDrill.category = null;
  }

  renderSummaries();
  renderGraphDetail();
}

function renderSupplierFilter() {
  const suppliers = [...new Set(state.expenses.map((expense) => expense.supplier))].sort((a, b) =>
    a.localeCompare(b)
  );
  const currentValue = elements.filterSupplier.value;

  elements.filterSupplier.innerHTML = ['<option value="">Todos</option>']
    .concat(suppliers.map((supplier) => `<option value="${supplier}">${supplier}</option>`))
    .join("");

  if (suppliers.includes(currentValue)) {
    elements.filterSupplier.value = currentValue;
  }
}

function renderSuppliersOverview() {
  const filteredExpenses = getFilteredExpenses();
  const groupedSuppliers = Array.from(
    filteredExpenses.reduce((groups, expense) => {
      const current = groups.get(expense.supplier) || {
        name: expense.supplier,
        total: 0,
        launches: 0,
      };

      current.total += getExpenseTotal(expense);
      current.launches += 1;
      groups.set(expense.supplier, current);
      return groups;
    }, new Map()).values()
  ).sort((a, b) => a.name.localeCompare(b.name));

  if (state.reportDrillSupplier) {
    renderSupplierOverviewDetail(filteredExpenses);
    return;
  }

  if (!groupedSuppliers.length) {
    elements.reportSuppliersList.innerHTML = `<div class="empty-state">Nenhum fornecedor encontrado com os filtros atuais.</div>`;
    return;
  }

  elements.reportSuppliersList.innerHTML = groupedSuppliers
    .map(
      (supplier) => `
        <button type="button" class="supplier-summary-card" data-open-supplier="${escapeAttribute(supplier.name)}">
          <div class="supplier-summary-top">
            <strong>${escapeHtml(supplier.name)}</strong>
            <span>${formatCurrency(supplier.total)}</span>
          </div>
          <small>${supplier.launches} lancamento(s)</small>
        </button>
      `
    )
    .join("");

  elements.reportSuppliersList.querySelectorAll("[data-open-supplier]").forEach((button) => {
    button.addEventListener("click", () => {
      state.reportDrillSupplier = button.dataset.openSupplier;
      renderSuppliersOverview();
    });
  });
}

function renderTable() {
  const filtered = getFilteredExpenses();

  const filteredTotal = filtered.reduce((sum, expense) => sum + getExpenseTotal(expense), 0);
  elements.reportSummary.textContent = `${filtered.length} lancamento(s) - ${formatCurrency(filteredTotal)}`;

  if (!filtered.length) {
    elements.expensesTableBody.innerHTML = `
      <tr>
        <td colspan="8">
          <div class="empty-state">Nenhum lancamento encontrado com esses filtros.</div>
        </td>
      </tr>
    `;
    return;
  }

  elements.expensesTableBody.innerHTML = filtered
    .map(
      (expense) => `
        <tr>
          <td>${formatDate(expense.date)}</td>
          <td>${expense.category}</td>
          <td>${expense.quantity}</td>
          <td>${expense.supplier}</td>
          <td>${expense.description}</td>
          <td>${expense.invoice || "-"}</td>
          <td>${formatCurrency(getExpenseTotal(expense))}</td>
          <td>
            <div class="table-actions">
              <button type="button" class="table-button" data-action="edit" data-id="${expense.id}">Editar</button>
              <button type="button" class="table-button delete" data-action="delete" data-id="${expense.id}">Excluir</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");

  elements.expensesTableBody.querySelectorAll("[data-action='edit']").forEach((button) => {
    button.addEventListener("click", () => startEdit(button.dataset.id));
  });

  elements.expensesTableBody.querySelectorAll("[data-action='delete']").forEach((button) => {
    button.addEventListener("click", () => deleteExpense(button.dataset.id));
  });
}

function clearReportFilters() {
  elements.filterDateFrom.value = "";
  elements.filterDateTo.value = "";
  elements.filterCategory.value = "";
  elements.filterSupplier.value = "";
  elements.filterSearch.value = "";
  state.reportDrillSupplier = null;
  renderTable();
  renderSuppliersOverview();
}

function handleReportFilterChange() {
  state.reportDrillSupplier = null;
  renderTable();
  renderSuppliersOverview();
}

function getFilteredExpenses() {
  const dateFrom = elements.filterDateFrom.value;
  const dateTo = elements.filterDateTo.value;
  const category = elements.filterCategory.value;
  const supplier = elements.filterSupplier.value;
  const search = elements.filterSearch.value.trim().toLowerCase();

  return state.expenses
    .filter((expense) => !dateFrom || expense.date >= dateFrom)
    .filter((expense) => !dateTo || expense.date <= dateTo)
    .filter((expense) => !category || expense.category === category)
    .filter((expense) => !supplier || expense.supplier === supplier)
    .filter((expense) => {
      if (!search) {
        return true;
      }

      return [expense.description, expense.supplier, expense.category, expense.invoice]
        .join(" ")
        .toLowerCase()
        .includes(search);
    })
    .sort((left, right) => right.date.localeCompare(left.date));
}

function renderSupplierOverviewDetail(filteredExpenses) {
  const supplierName = state.reportDrillSupplier;
  const supplierExpenses = filteredExpenses.filter((expense) => expense.supplier === supplierName);

  if (!supplierExpenses.length) {
    state.reportDrillSupplier = null;
    renderSuppliersOverview();
    return;
  }

  const total = supplierExpenses.reduce((sum, expense) => sum + getExpenseTotal(expense), 0);

  elements.reportSuppliersList.innerHTML = `
    <div class="report-drill-card">
      <div class="report-drill-header">
        <div>
          <strong>${escapeHtml(supplierName)}</strong>
          <small>${supplierExpenses.length} lancamento(s)  -  ${formatCurrency(total)}</small>
        </div>
        <button type="button" class="table-button" id="reportSupplierBackButton">Voltar</button>
      </div>
      <div class="report-drill-table-wrapper">
        <table class="data-table compact-report-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Categoria</th>
              <th>Descricao</th>
              <th>NF</th>
              <th>Valor pago</th>
            </tr>
          </thead>
          <tbody>
            ${supplierExpenses
              .map(
                (expense) => `
                  <tr>
                    <td>${formatDate(expense.date)}</td>
                    <td>${escapeHtml(expense.category)}</td>
                    <td>${escapeHtml(expense.description)}</td>
                    <td>${escapeHtml(expense.invoice || "-")}</td>
                    <td>${formatCurrency(getExpenseTotal(expense))}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.querySelector("#reportSupplierBackButton")?.addEventListener("click", () => {
    state.reportDrillSupplier = null;
    renderSuppliersOverview();
  });
}

function startEdit(expenseId) {
  const expense = state.expenses.find((item) => item.id === expenseId);
  if (!expense) {
    return;
  }

  state.editingExpenseId = expenseId;
  elements.expenseDate.value = expense.date;
  elements.expenseSupplier.value = expense.supplier;
  elements.expenseInvoice.value = expense.invoice;
  elements.expenseNotes.value = expense.notes;
  const groupId = expense.invoiceGroupId || expense.id;
  setExpenseItems(
    state.expenses
      .filter((item) => (item.invoiceGroupId || item.id) === groupId)
      .map((item) => ({
        category: item.category,
        description: item.description,
        quantity: item.quantity,
        unitValue: item.unitValue,
        discountValue: item.discountValue || 0,
      }))
  );
  setView("lancamentos");
  renderFormState();
}

function deleteExpense(expenseId) {
  const expense = state.expenses.find((item) => item.id === expenseId);
  if (!expense) {
    return;
  }

  const confirmed = window.confirm(
    `Excluir o lancamento "${expense.description}" de ${formatCurrency(getExpenseTotal(expense))}?`
  );

  if (!confirmed) {
    return;
  }

  state.expenses = state.expenses.filter((item) => item.id !== expenseId);
  if (state.editingExpenseId === expenseId) {
    resetForm();
  }
  persistExpenses();
  render();
}

function resetForm() {
  state.editingExpenseId = null;
  elements.expenseForm.reset();
  elements.expenseDate.value = today();
  setExpenseItems([createEmptyExpenseItem()]);
  renderFormState();
}

function fillBrandForm() {
  elements.brandEyebrowInput.value = state.brandConfig.eyebrow;
  elements.brandTitleInput.value = state.brandConfig.title;
  elements.brandDescriptionInput.value = state.brandConfig.description;
}

function openBrandEditor() {
  fillBrandForm();
  elements.brandEditorOverlay.hidden = false;
}

function closeBrandEditor() {
  elements.brandEditorOverlay.hidden = true;
}

function editLandValue() {
  const nextValue = window.prompt("Informe o valor do terreno (R$):", String(state.projectConfig.landValue));
  if (nextValue === null) {
    return;
  }

  const parsed = Number(String(nextValue).replace(",", "."));
  if (Number.isNaN(parsed) || parsed < 0) {
    window.alert("Informe um valor valido para o terreno.");
    return;
  }

  state.projectConfig = {
    ...state.projectConfig,
    landValue: parsed,
  };
  persistProjectConfig();
  render();
}

function editSaleTarget() {
  const nextValue = window.prompt(
    "Informe o valor de venda da obra (R$):",
    String(state.projectConfig.saleTarget)
  );
  if (nextValue === null) {
    return;
  }

  const parsed = Number(String(nextValue).replace(",", "."));
  if (Number.isNaN(parsed) || parsed < 0) {
    window.alert("Informe um valor valido para venda.");
    return;
  }

  state.projectConfig = {
    ...state.projectConfig,
    saleTarget: parsed,
  };
  persistProjectConfig();
  render();
}

function editProjectArea() {
  const nextValue = window.prompt(
    "Informe a metragem construida (m2):",
    String(state.projectConfig.areaSquareMeters)
  );
  if (nextValue === null) {
    return;
  }

  const parsed = Number(String(nextValue).replace(",", "."));
  if (Number.isNaN(parsed) || parsed < 0) {
    window.alert("Informe uma metragem valida.");
    return;
  }

  state.projectConfig = {
    ...state.projectConfig,
    areaSquareMeters: parsed,
  };
  persistProjectConfig();
  render();
}

async function handleCnpjLookup() {
  const cnpj = onlyDigits(elements.supplierCnpj.value);
  if (cnpj.length !== 14) {
    window.alert("Informe um CNPJ valido com 14 digitos.");
    return;
  }

  const originalLabel = elements.lookupCnpjButton.textContent;
  elements.lookupCnpjButton.disabled = true;
  elements.lookupCnpjButton.textContent = "Buscando...";

  try {
    const response = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`);
    if (!response.ok) {
      throw new Error(`http_${response.status}`);
    }

    const data = await response.json();
    applyCnpjLookupResult(data);
    await loadCitiesForSelectedState();
    window.alert("Dados do CNPJ preenchidos no cadastro. Revise e salve o fornecedor.");
  } catch (error) {
    if (String(error.message || "").includes("http_429")) {
      window.alert("Limite momentaneo de consultas atingido. Aguarde um pouco e tente novamente.");
      return;
    }

    if (String(error.message || "").includes("http_404")) {
      window.alert("CNPJ nao encontrado na base consultada.");
      return;
    }

    window.alert(
      "Nao foi possivel consultar esse CNPJ agora. Verifique o numero informado ou tente novamente em alguns instantes."
    );
  } finally {
    elements.lookupCnpjButton.disabled = false;
    elements.lookupCnpjButton.textContent = originalLabel;
  }
}

async function handleZipCodeLookup() {
  const zipCode = onlyDigits(elements.supplierZipCode.value);
  if (zipCode.length !== 8) {
    window.alert("Informe um CEP valido com 8 digitos.");
    return;
  }

  const originalLabel = elements.lookupZipCodeButton.textContent;
  elements.lookupZipCodeButton.disabled = true;
  elements.lookupZipCodeButton.textContent = "Buscando...";

  try {
    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
    if (!response.ok) {
      throw new Error(`http_${response.status}`);
    }

    const data = await response.json();
    if (data.erro) {
      window.alert("CEP nao encontrado.");
      return;
    }

    applyZipCodeLookupResult(data);
    await loadCitiesForSelectedState();
    window.alert("Endereco preenchido a partir do CEP. Revise e salve o fornecedor.");
  } catch (error) {
    window.alert("Nao foi possivel consultar esse CEP agora. Tente novamente em alguns instantes.");
  } finally {
    elements.lookupZipCodeButton.disabled = false;
    elements.lookupZipCodeButton.textContent = originalLabel;
  }
}

function parseInvoiceXml(xmlText) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "text/xml");

  if (xml.querySelector("parsererror")) {
    throw new Error("invalid xml");
  }

  const supplier =
    getXmlValue(xml, "emit > xNome") ||
    getXmlValue(xml, "emit xNome") ||
    getXmlValue(xml, "xNome");
  const invoice = getXmlValue(xml, "ide > nNF") || getXmlValue(xml, "ide nNF");
  const issueDateRaw =
    getXmlValue(xml, "ide > dhEmi") ||
    getXmlValue(xml, "ide > dEmi") ||
    getXmlValue(xml, "dhEmi") ||
    getXmlValue(xml, "dEmi");
  const invoiceTotal = parseDecimal(getXmlValue(xml, "ICMSTot > vNF") || getXmlValue(xml, "ICMSTot vNF") || "0");
  const totalDiscount = parseDecimal(
    getXmlValue(xml, "ICMSTot > vDesc") || getXmlValue(xml, "ICMSTot vDesc") || "0"
  );

  const detNodes = [...xml.getElementsByTagNameNS("*", "det")];
  const items = detNodes
    .map((det) => {
      const description = getChildText(det, "xProd");
      const quantity = parseDecimal(getChildText(det, "qCom") || "0");
      const unitValue = parseDecimal(getChildText(det, "vUnCom") || "0");
      const totalValue = parseDecimal(getChildText(det, "vProd") || "0");
      const discountValue = parseDecimal(getChildText(det, "vDesc") || "0");
      return { description, quantity, unitValue, totalValue, discountValue };
    })
    .filter((item) => item.description || item.totalValue);

  const itemsWithDiscount = distributeXmlDiscount(items, totalDiscount);

  return {
    supplier: supplier || "",
    invoice: invoice || "",
    date: normalizeInvoiceDate(issueDateRaw),
    items: itemsWithDiscount.length
      ? itemsWithDiscount.map((item) => ({
          category: categories[0],
          description: item.description || "Item importado",
          quantity: item.quantity || 1,
          unitValue: item.unitValue || item.totalValue || 0,
          discountValue: item.discountValue || 0,
        }))
      : [
          {
            category: categories[0],
            description: "NF-e importada",
            quantity: 1,
            unitValue: invoiceTotal,
            discountValue: totalDiscount,
          },
        ],
  };
}

function getXmlValue(xml, selector) {
  const parts = selector.split(">").map((part) => part.trim()).filter(Boolean);
  let current = xml.documentElement;

  for (const part of parts) {
    const next = [...current.getElementsByTagNameNS("*", part)][0];
    if (!next) {
      return "";
    }
    current = next;
  }

  return current.textContent?.trim() || "";
}

function getChildText(node, localName) {
  const child = [...node.getElementsByTagNameNS("*", localName)][0];
  return child?.textContent?.trim() || "";
}

function normalizeInvoiceDate(value) {
  if (!value) {
    return "";
  }

  const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : value;
}

function parseDecimal(value) {
  return Number.parseFloat(String(value || "0").replace(",", ".")) || 0;
}

function distributeXmlDiscount(items, totalDiscount) {
  if (!items.length) {
    return [];
  }

  const hasItemDiscount = items.some((item) => item.discountValue > 0);
  if (hasItemDiscount || totalDiscount <= 0) {
    return items;
  }

  const baseTotal = items.reduce((sum, item) => sum + item.totalValue, 0);
  if (baseTotal <= 0) {
    return items;
  }

  let allocated = 0;
  return items.map((item, index) => {
    if (index === items.length - 1) {
      return {
        ...item,
        discountValue: Math.max(totalDiscount - allocated, 0),
      };
    }

    const proportionalDiscount = Number(((item.totalValue / baseTotal) * totalDiscount).toFixed(2));
    allocated += proportionalDiscount;
    return {
      ...item,
      discountValue: proportionalDiscount,
    };
  });
}

function renderSupplierFormState() {
  const isEditing = Boolean(state.editingSupplierId);
  elements.supplierSubmitButton.textContent = isEditing ? "Salvar fornecedor" : "Cadastrar fornecedor";
  elements.cancelSupplierEditButton.hidden = !isEditing;
  elements.supplierFormModeBadge.textContent = isEditing ? "Modo edicao" : "Modo criacao";
}

function startSupplierEdit(supplierId) {
  const supplier = state.suppliers.find((item) => item.id === supplierId);
  if (!supplier) {
    return;
  }

  state.editingSupplierId = supplierId;
  state.selectedSupplierId = supplierId;
  elements.supplierName.value = supplier.name;
  elements.supplierTradeName.value = supplier.tradeName || "";
  elements.supplierCnpj.value = supplier.cnpj;
  elements.supplierStateRegistration.value = supplier.stateRegistration || "";
  elements.supplierEmail.value = supplier.email;
  elements.supplierPhone.value = supplier.phone;
  elements.supplierMobile.value = supplier.mobile || "";
  elements.supplierZipCode.value = supplier.zipCode || "";
  elements.supplierAddress.value = supplier.address;
  elements.supplierNumber.value = supplier.number || "";
  elements.supplierComplement.value = supplier.complement || "";
  elements.supplierDistrict.value = supplier.district || "";
  elements.supplierCity.value = supplier.city || "";
  elements.supplierState.value = supplier.state || "";
  elements.supplierNotes.value = supplier.notes || "";
  renderSupplierFormState();
  setView("cadastros");
  void loadCitiesForSelectedState();
  elements.supplierForm.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    elements.supplierName.focus();
    elements.supplierName.select();
  }, 200);
}

function resetSupplierForm() {
  state.editingSupplierId = null;
  elements.supplierForm.reset();
  renderCitySuggestions([]);
  renderSupplierFormState();
}

function deleteSupplier(supplierId) {
  const supplier = state.suppliers.find((item) => item.id === supplierId);
  if (!supplier) {
    return;
  }

  const usageCount = state.expenses.filter((expense) => expense.supplier === supplier.name).length;
  if (usageCount > 0) {
    window.alert(
      `Nao e possivel excluir "${supplier.name}" porque ele esta vinculado a ${usageCount} lancamento(s).`
    );
    return;
  }

  const confirmed = window.confirm(`Excluir o fornecedor "${supplier.name}"?`);
  if (!confirmed) {
    return;
  }

  state.suppliers = state.suppliers.filter((item) => item.id !== supplierId);
  if (state.selectedSupplierId === supplierId) {
    state.selectedSupplierId = null;
  }
  if (state.editingSupplierId === supplierId) {
    resetSupplierForm();
  }
  persistSuppliers();
  ensureSelectedSupplierIsVisible();
  render();
}

function ensureSuppliersFromExpenses() {
  const merged = [...state.suppliers];
  state.expenses.forEach((expense) => {
    const name = normalizeSupplierName(expense.supplier);
    if (!name) {
      return;
    }

      const exists = merged.some((supplier) => supplier.name.toLowerCase() === name.toLowerCase());
      if (!exists) {
        merged.push({
          id: crypto.randomUUID(),
          name,
          tradeName: "",
          cnpj: "",
          stateRegistration: "",
          email: "",
          phone: "",
          mobile: "",
          zipCode: "",
          address: "",
          number: "",
          complement: "",
          district: "",
          city: "",
          state: "",
          notes: "",
        });
      }
  });

  state.suppliers = merged.sort((a, b) => a.name.localeCompare(b.name));
  ensureSelectedSupplierIsVisible();
  persistSuppliers();
}

function ensureSupplierExists(name) {
  if (!name) {
    return;
  }

  const exists = state.suppliers.some((supplier) => supplier.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    return;
  }

  state.suppliers = [
    ...state.suppliers,
      {
        id: crypto.randomUUID(),
        name,
        tradeName: "",
        cnpj: "",
        stateRegistration: "",
        email: "",
        phone: "",
        mobile: "",
        zipCode: "",
        address: "",
        number: "",
        complement: "",
        district: "",
        city: "",
        state: "",
        notes: "",
      },
  ].sort((a, b) => a.name.localeCompare(b.name));

  state.selectedSupplierId = state.selectedSupplierId || state.suppliers[0]?.id || null;
  persistSuppliers();
  fillSupplierSelect();
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    groups[item[key]] ??= [];
    groups[item[key]].push(item);
    return groups;
  }, {});
}

function getExpenseTotal(expense) {
  const gross = Number(expense.quantity) * Number(expense.unitValue);
  const discount = Number(expense.discountValue || 0);
  return Math.max(gross - discount, 0);
}

function loadExpenses() {
  const saved = localStorage.getItem("obra-certa-expenses");
  if (!saved) {
    return initialExpenses;
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : initialExpenses;
  } catch {
    return initialExpenses;
  }
}

function loadProjectConfig() {
  const saved = localStorage.getItem("obra-certa-project-config");
  if (!saved) {
    return defaultProjectConfig;
  }

  try {
    return { ...defaultProjectConfig, ...JSON.parse(saved) };
  } catch {
    return defaultProjectConfig;
  }
}

function loadBrandConfig() {
  const saved = localStorage.getItem("obra-certa-brand-config");
  if (!saved) {
    return { ...defaultBrandConfig };
  }

  try {
    return { ...defaultBrandConfig, ...JSON.parse(saved) };
  } catch {
    return { ...defaultBrandConfig };
  }
}

function loadSuppliers() {
  const saved = localStorage.getItem("obra-certa-suppliers");
  if (!saved) {
    return normalizeSuppliers(defaultSuppliers);
  }

  try {
    const parsed = JSON.parse(saved);
    return normalizeSuppliers(parsed);
  } catch {
    return normalizeSuppliers(defaultSuppliers);
  }
}

function persistExpenses() {
  localStorage.setItem("obra-certa-expenses", JSON.stringify(state.expenses));
  queueCloudSync();
}

function persistProjectConfig() {
  localStorage.setItem("obra-certa-project-config", JSON.stringify(state.projectConfig));
  queueCloudSync();
}

function persistBrandConfig() {
  localStorage.setItem("obra-certa-brand-config", JSON.stringify(state.brandConfig));
  queueCloudSync();
}

function persistSuppliers() {
  localStorage.setItem("obra-certa-suppliers", JSON.stringify(state.suppliers));
  queueCloudSync();
}

function persistAllLocal() {
  localStorage.setItem("obra-certa-expenses", JSON.stringify(state.expenses));
  localStorage.setItem("obra-certa-project-config", JSON.stringify(state.projectConfig));
  localStorage.setItem("obra-certa-brand-config", JSON.stringify(state.brandConfig));
  localStorage.setItem("obra-certa-suppliers", JSON.stringify(state.suppliers));
}

function normalizeSuppliers(suppliers) {
  if (!Array.isArray(suppliers) || !suppliers.length) {
    return defaultSuppliers.map((supplier) => normalizeSupplierRecord(supplier)).filter((supplier) => supplier.name);
  }

  return suppliers.map(normalizeSupplierRecord).filter((supplier) => supplier.name);
}

function normalizeSupplierRecord(supplier) {
  if (typeof supplier === "string") {
    return {
      id: crypto.randomUUID(),
      name: normalizeSupplierName(supplier),
      tradeName: "",
      cnpj: "",
      stateRegistration: "",
      email: "",
      phone: "",
      mobile: "",
      zipCode: "",
      address: "",
      number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
      notes: "",
    };
  }

  return {
    id: supplier?.id || crypto.randomUUID(),
    name: normalizeSupplierName(supplier?.name || ""),
    tradeName: supplier?.tradeName || "",
    cnpj: supplier?.cnpj || "",
    stateRegistration: supplier?.stateRegistration || "",
    email: supplier?.email || "",
    phone: supplier?.phone || "",
    mobile: supplier?.mobile || "",
    zipCode: supplier?.zipCode || "",
    address: supplier?.address || "",
    number: supplier?.number || "",
    complement: supplier?.complement || "",
    district: supplier?.district || "",
    city: supplier?.city || "",
    state: supplier?.state || "",
    notes: supplier?.notes || "",
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-BR").format(new Date(`${value}T12:00:00`));
}

function formatPercent(value) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value) + "%";
}

function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercentValue(value, total) {
  if (!total) {
    return "0,00%";
  }

  return formatPercent((value / total) * 100);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function normalizeSupplierName(value) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeStateCode(value) {
  return String(value || "")
    .replace(/[^a-z]/gi, "")
    .slice(0, 2)
    .toUpperCase();
}

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

async function loadCitiesForSelectedState() {
  const stateCode = normalizeStateCode(elements.supplierState.value);
  if (stateCode.length !== 2) {
    renderCitySuggestions([]);
    return [];
  }

  elements.supplierState.value = stateCode;

  if (cityOptionsCache.has(stateCode)) {
    const cachedCities = cityOptionsCache.get(stateCode);
    renderCitySuggestions(cachedCities);
    return cachedCities;
  }

  try {
    const response = await fetch(`${CITY_API_BASE_URL}/${stateCode}/municipios`);
    if (!response.ok) {
      throw new Error(`http_${response.status}`);
    }

    const cities = (await response.json())
      .map((city) => city?.nome)
      .filter(Boolean)
      .sort((left, right) => left.localeCompare(right, "pt-BR"));

    cityOptionsCache.set(stateCode, cities);
    renderCitySuggestions(cities);
    return cities;
  } catch (error) {
    console.error(`Falha ao carregar cidades da UF ${stateCode}.`, error);
    renderCitySuggestions([]);
    return [];
  }
}

function renderCitySuggestions(cities) {
  elements.supplierCitySuggestions.innerHTML = cities
    .map((city) => `<option value="${escapeAttribute(city)}"></option>`)
    .join("");
}

function isKnownCityForState(stateCode, cityName) {
  const cities = cityOptionsCache.get(stateCode);
  if (!cities?.length) {
    return true;
  }

  const normalizedCityName = normalizeSearchText(cityName);
  return cities.some((city) => normalizeSearchText(city) === normalizedCityName);
}

function formatAddressLine(supplier) {
  const parts = [
    supplier.address,
    supplier.number,
    supplier.complement,
    supplier.district,
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : "-";
}

function formatCityStateLine(supplier) {
  const parts = [supplier.city, supplier.state].filter(Boolean);
  return parts.length ? parts.join(" / ") : "-";
}

function renderSupplierMeta(supplier) {
  const metaRows = [
    ["Fantasia", supplier.tradeName],
    ["CNPJ", supplier.cnpj],
    ["IE", supplier.stateRegistration],
    ["Email", supplier.email],
    ["Telefone", supplier.phone],
    ["Celular", supplier.mobile],
    ["CEP", supplier.zipCode],
    ["Endereco", formatAddressLine(supplier) !== "-" ? formatAddressLine(supplier) : ""],
    ["Cidade/UF", formatCityStateLine(supplier) !== "-" ? formatCityStateLine(supplier) : ""],
    ["Observacoes", supplier.notes],
  ].filter(([, value]) => value);

  if (!metaRows.length) {
    return "";
  }

  return metaRows
    .map(([label, value]) => `<span>${label}: ${escapeHtml(value)}</span>`)
    .join("");
}

function applyCnpjLookupResult(data) {
  const establishment = data.estabelecimento || {};
  const stateRegistration =
    establishment.inscricoes_estaduais?.find((item) => item.ativo)?.inscricao_estadual ||
    establishment.inscricoes_estaduais?.[0]?.inscricao_estadual ||
    "";
  const phonePrimary = formatPhoneNumber(establishment.ddd1, establishment.telefone1);
  const phoneSecondary = formatPhoneNumber(establishment.ddd2, establishment.telefone2);
  const email = establishment.email || data.email || "";
  const tradeName = establishment.nome_fantasia || data.nome_fantasia || "";
  const cityName =
    establishment.cidade?.nome ||
    establishment.cidade?.nome_ibge ||
    data.cidade?.nome ||
    "";
  const stateCode = establishment.estado?.sigla || data.estado?.sigla || "";
  const nextCnpj = formatCnpj(cnpjFromLookup(data, establishment));
  const nextStreet = buildStreet(establishment);
  const nextZipCode = formatZipCode(establishment.cep || elements.supplierZipCode.value);

  elements.supplierName.value = data.razao_social || elements.supplierName.value;
  elements.supplierTradeName.value = tradeName || elements.supplierTradeName.value;
  elements.supplierCnpj.value = nextCnpj || elements.supplierCnpj.value;
  elements.supplierStateRegistration.value = stateRegistration || elements.supplierStateRegistration.value;
  elements.supplierEmail.value = email || elements.supplierEmail.value;
  elements.supplierPhone.value = phonePrimary || elements.supplierPhone.value;
  elements.supplierMobile.value = phoneSecondary || elements.supplierMobile.value;
  elements.supplierZipCode.value = nextZipCode || elements.supplierZipCode.value;
  elements.supplierAddress.value = nextStreet || elements.supplierAddress.value;
  elements.supplierNumber.value = establishment.numero || elements.supplierNumber.value;
  elements.supplierComplement.value = establishment.complemento || elements.supplierComplement.value;
  elements.supplierDistrict.value = establishment.bairro || elements.supplierDistrict.value;
  elements.supplierCity.value = cityName || elements.supplierCity.value;
  elements.supplierState.value = stateCode || elements.supplierState.value;
}

function applyZipCodeLookupResult(data) {
  const nextZipCode = formatZipCode(data.cep || elements.supplierZipCode.value);
  const nextStreet = [data.logradouro, data.complemento].filter(Boolean).join(" ").trim();

  elements.supplierZipCode.value = nextZipCode || elements.supplierZipCode.value;
  elements.supplierAddress.value = nextStreet || elements.supplierAddress.value;
  elements.supplierDistrict.value = data.bairro || elements.supplierDistrict.value;
  elements.supplierCity.value = data.localidade || elements.supplierCity.value;
  elements.supplierState.value = normalizeStateCode(data.uf || elements.supplierState.value);
}

function cnpjFromLookup(root, establishment) {
  return (
    establishment.cnpj ||
    [root.cnpj_raiz, establishment.cnpj_ordem, establishment.cnpj_digito_verificador].filter(Boolean).join("")
  );
}

function buildStreet(establishment) {
  const parts = [establishment.tipo_logradouro, establishment.logradouro].filter(Boolean);
  return parts.join(" ").trim();
}

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatCnpj(value) {
  const digits = onlyDigits(value);
  if (digits.length !== 14) {
    return value || "";
  }

  return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

function formatZipCode(value) {
  const digits = onlyDigits(value);
  if (digits.length !== 8) {
    return value || "";
  }

  return digits.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

function formatPhoneNumber(ddd, phone) {
  const digits = onlyDigits(`${ddd || ""}${phone || ""}`);
  if (!digits) {
    return "";
  }

  if (digits.length === 10) {
    return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  }

  if (digits.length === 11) {
    return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  return digits;
}

function normalizeExpense(expense) {
  return {
    ...expense,
    invoiceGroupId: expense.invoiceGroupId || expense.id,
    category: expense.category || categories[0],
    discountValue: Number(expense.discountValue || 0),
  };
}

function createEmptyExpenseItem() {
  return {
    category: categories[0],
    description: "",
    quantity: 1,
    unitValue: 0,
    discountValue: 0,
  };
}

function setExpenseItems(items) {
  const normalizedItems = items?.length ? items : [createEmptyExpenseItem()];
  elements.expenseItemsBody.innerHTML = normalizedItems
    .map((item, index) => renderExpenseItemRow(item, index))
    .join("");
  bindExpenseItemRowEvents();
  syncExpenseItemsTotal();
}

function renderExpenseItemRow(item, index) {
  const paidValue = Math.max(
    Number(item.quantity || 0) * Number(item.unitValue || 0) - Number(item.discountValue || 0),
    0
  );

  return `
    <tr data-item-row="${index}">
      <td>
        <select data-item-field="category" required>
          ${categories
            .map(
              (category) =>
                `<option value="${escapeAttribute(category)}"${item.category === category ? " selected" : ""}>${category}</option>`
            )
            .join("")}
        </select>
      </td>
      <td><input type="text" data-item-field="description" value="${escapeAttribute(item.description || "")}" placeholder="Descricao do item" required></td>
      <td><input type="number" data-item-field="quantity" min="0" step="0.01" value="${Number(item.quantity || 1)}" required></td>
      <td><input type="number" data-item-field="unitValue" min="0" step="0.01" value="${Number(item.unitValue || 0)}" required></td>
      <td><input type="number" data-item-field="discountValue" min="0" step="0.01" value="${Number(item.discountValue || 0)}"></td>
      <td><input type="text" data-item-field="paidValue" value="${formatCurrency(paidValue)}" readonly></td>
      <td><button type="button" class="table-button delete" data-remove-item="${index}">Remover</button></td>
    </tr>
  `;
}

function bindExpenseItemRowEvents() {
  elements.expenseItemsBody
    .querySelectorAll('[data-item-field="quantity"], [data-item-field="unitValue"], [data-item-field="discountValue"]')
    .forEach((input) => {
      input.addEventListener("input", syncExpenseItemsTotal);
    });

  elements.expenseItemsBody.querySelectorAll("[data-remove-item]").forEach((button) => {
    button.addEventListener("click", () => {
      const rows = [...elements.expenseItemsBody.querySelectorAll("tr")];
      if (rows.length === 1) {
        setExpenseItems([createEmptyExpenseItem()]);
        return;
      }

      button.closest("tr")?.remove();
      syncExpenseItemsTotal();
    });
  });
}

function collectExpenseItems() {
  return [...elements.expenseItemsBody.querySelectorAll("tr")]
    .map((row) => ({
      category: row.querySelector('[data-item-field="category"]')?.value || "",
      description: row.querySelector('[data-item-field="description"]')?.value.trim() || "",
      quantity: Number(row.querySelector('[data-item-field="quantity"]')?.value || 0),
      unitValue: Number(row.querySelector('[data-item-field="unitValue"]')?.value || 0),
      discountValue: Number(row.querySelector('[data-item-field="discountValue"]')?.value || 0),
    }))
    .filter((item) => item.category && item.description && item.quantity > 0);
}

function appendExpenseItemRow(item = createEmptyExpenseItem()) {
  const nextIndex = elements.expenseItemsBody.querySelectorAll("tr").length;
  elements.expenseItemsBody.insertAdjacentHTML("beforeend", renderExpenseItemRow(item, nextIndex));
  bindExpenseItemRowEvents();
}

function syncExpenseItemsTotal() {
  let total = 0;

  [...elements.expenseItemsBody.querySelectorAll("tr")].forEach((row) => {
    const quantity = Number(row.querySelector('[data-item-field="quantity"]')?.value || 0);
    const unitValue = Number(row.querySelector('[data-item-field="unitValue"]')?.value || 0);
    const discountValue = Number(row.querySelector('[data-item-field="discountValue"]')?.value || 0);
    const paid = Math.max(quantity * unitValue - discountValue, 0);
    const paidField = row.querySelector('[data-item-field="paidValue"]');
    if (paidField) {
      paidField.value = formatCurrency(paid);
    }
    total += paid;
  });

  elements.expenseItemsTotal.textContent = formatCurrency(total);
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getSpentBySupplier(supplierName) {
  return state.expenses
    .filter((expense) => expense.supplier === supplierName)
    .reduce((sum, expense) => sum + getExpenseTotal(expense), 0);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

