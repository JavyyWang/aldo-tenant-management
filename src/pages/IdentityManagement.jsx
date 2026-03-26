import React, { useState } from 'react';
import {
  FluentProvider,
  webLightTheme,
  Title1,
  Title2,
  Title3,
  TabList,
  Tab,
  Button,
  Badge,
  Divider,
  Body1,
  Body2,
  SearchBox,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarDivider,
  MenuButton,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  SplitButton,
  MenuSplitButtonProps,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Settings20Regular,
  ArrowClockwise20Regular,
  ArrowDownload20Regular,
  Open20Regular,
  Tag20Regular,
  Delete20Regular,
  Pin20Regular,
  Heart20Regular,
  MoreHorizontal20Regular,
  Dismiss20Regular,
  ChevronDown20Regular,
} from '@fluentui/react-icons';

const IdentityManagement = () => {
  const [selectedTab, setSelectedTab] = useState('sources');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAdminUnit, setSelectedAdminUnit] = useState(null);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    unitName: '',
    description: '',
    selectedTenants: [],
    tenantAdmin: '',
    spnPermissions: false,
    selfService: false
  });

  const renderBladeHeader = () => {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid #d1d1d1',
        backgroundColor: 'white',
        fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif'
      }}>
        {/* Left section - Title and subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Title2 style={{ margin: 0, fontWeight: 600, fontSize: '20px', lineHeight: '28px' }}>
            Operator Identity Management Console
          </Title2>
          <Body2 style={{ margin: 0, color: '#605e5c', fontSize: '12px', lineHeight: '16px' }}>
            Multi-tenant identity and federation management
          </Body2>
        </div>

        {/* Right section - Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            icon={<Pin20Regular />}
            appearance="subtle"
            size="small"
            title="Pin to dashboard"
            style={{ minWidth: '32px', padding: '4px' }}
          />
          <Button
            icon={<Heart20Regular />}
            appearance="subtle"
            size="small"
            title="Add to favorites"
            style={{ minWidth: '32px', padding: '4px' }}
          />
          <Button
            icon={<MoreHorizontal20Regular />}
            appearance="subtle"
            size="small"
            title="More actions"
            style={{ minWidth: '32px', padding: '4px' }}
          />
          <Button
            icon={<Dismiss20Regular />}
            appearance="subtle"
            size="small"
            title="Close"
            style={{ minWidth: '32px', padding: '4px' }}
          />
        </div>
      </div>
    );
  };

  const renderToolbar = () => {
    const isItemSelected = selectedItems.length > 0;
    
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 24px',
        borderBottom: '1px solid #d1d1d1',
        backgroundColor: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            icon={<Add20Regular />}
            appearance="subtle"
            onClick={() => {
              if (selectedTab === 'groups') {
                setShowWizard(true);
              }
            }}
          >
            Create
          </Button>

          <MenuButton 
            icon={<Settings20Regular />}
            appearance="subtle"
            menuIcon={<ChevronDown20Regular />}
          >
            Manage view
            <Menu>
              <MenuList>
                <MenuItem>Show all columns</MenuItem>
                <MenuItem>Hide inactive items</MenuItem>
                <MenuItem>Group by status</MenuItem>
                <MenuItem>Export view settings</MenuItem>
              </MenuList>
            </Menu>
          </MenuButton>

          <Button
            icon={<ArrowClockwise20Regular />}
            appearance="subtle"
          >
            Refresh
          </Button>

          <Button
            icon={<ArrowDownload20Regular />}
            appearance="subtle"
          >
            Export to CSV
          </Button>

          <Button
            icon={<Open20Regular />}
            appearance="subtle"
          >
            Open query
          </Button>

          <div style={{ 
            width: '1px', 
            height: '20px', 
            backgroundColor: '#e0e0e0',
            margin: '0 8px'
          }} />

          <Button
            icon={<Tag20Regular />}
            appearance="subtle"
            disabled={!isItemSelected}
          >
            Assign tags
          </Button>

          <Button
            icon={<Delete20Regular />}
            appearance="subtle"
            disabled={!isItemSelected}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  };

  const renderFiltering = () => {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 24px',
        borderBottom: '1px solid #d1d1d1',
        backgroundColor: '#fafafa'
      }}>
        <SearchBox
          placeholder="Search identity sources, tenants, or endpoints..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '320px' }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge appearance="outline" style={{ cursor: 'pointer' }}>
            Active
          </Badge>
          <Badge appearance="outline" style={{ cursor: 'pointer' }}>
            Pending
          </Badge>
          <Badge appearance="outline" style={{ cursor: 'pointer' }}>
            All Tenants
          </Badge>
        </div>
      </div>
    );
  };

  const availableTenants = [
    { id: 'contoso', name: 'contoso.onmicrosoft.com' },
    { id: 'fabrikam', name: 'fabrikam.onmicrosoft.com' },
    { id: 'partners', name: 'partners.corp.local' },
    { id: 'vendors', name: 'vendors.company.com' }
  ];

  const availableAdmins = [
    { id: 'admin1', name: 'admin@contoso.com' },
    { id: 'admin2', name: 'admin@fabrikam.com' },
    { id: 'admin3', name: 'admin@partners.corp.local' }
  ];

  const resetWizard = () => {
    setShowWizard(false);
    setWizardStep(1);
    setWizardData({
      unitName: '',
      description: '',
      selectedTenants: [],
      tenantAdmin: '',
      spnPermissions: false,
      selfService: false
    });
  };

  const nextWizardStep = () => {
    if (wizardStep < 4) {
      setWizardStep(wizardStep + 1);
    }
  };

  const prevWizardStep = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1);
    }
  };

  const renderWizard = () => {
    if (!showWizard) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Title1>Create Administrative Unit</Title1>
            <Button onClick={resetWizard}>×</Button>
          </div>

          {/* Step Indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
            {[1, 2, 3, 4].map((step) => (
              <div key={step} style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: wizardStep >= step ? '#0078d4' : '#e1dfdd',
                  color: wizardStep >= step ? 'white' : '#605e5c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {step}
                </div>
                {step < 4 && (
                  <div style={{
                    flex: 1,
                    height: '2px',
                    backgroundColor: wizardStep > step ? '#0078d4' : '#e1dfdd',
                    marginLeft: '8px'
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          {wizardStep === 1 && renderWizardStep1()}
          {wizardStep === 2 && renderWizardStep2()}
          {wizardStep === 3 && renderWizardStep3()}
          {wizardStep === 4 && renderWizardStep4()}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            <Button disabled={wizardStep === 1} onClick={prevWizardStep}>Previous</Button>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button onClick={resetWizard}>Cancel</Button>
              {wizardStep < 4 ? (
                <Button variant="primary" onClick={nextWizardStep}>Next</Button>
              ) : (
                <Button variant="primary" onClick={() => {
                  // Handle creation logic here
                  resetWizard();
                }}>Create Administrative Unit</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWizardStep1 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Body1 weight="semibold">Step 1: Basic Information</Body1>
      <div>
        <Body1>Administrative Unit Name *</Body1>
        <input 
          type="text" 
          placeholder="e.g., Contoso Enterprises"
          value={wizardData.unitName}
          onChange={(e) => setWizardData({...wizardData, unitName: e.target.value})}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #e1dfdd',
            borderRadius: '4px',
            marginTop: '4px'
          }}
        />
      </div>
      <div>
        <Body1>Description</Body1>
        <textarea 
          placeholder="Describe the purpose of this Administrative Unit"
          value={wizardData.description}
          onChange={(e) => setWizardData({...wizardData, description: e.target.value})}
          rows={3}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #e1dfdd',
            borderRadius: '4px',
            marginTop: '4px',
            resize: 'vertical'
          }}
        />
      </div>
    </div>
  );

  const renderWizardStep2 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Body1 weight="semibold">Step 2: Associate Tenants</Body1>
      <Body1>Select which tenants to include in this Administrative Unit:</Body1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {availableTenants.map((tenant) => (
          <div key={tenant.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" 
              id={tenant.id}
              checked={wizardData.selectedTenants.includes(tenant.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setWizardData({...wizardData, selectedTenants: [...wizardData.selectedTenants, tenant.id]});
                } else {
                  setWizardData({...wizardData, selectedTenants: wizardData.selectedTenants.filter(t => t !== tenant.id)});
                }
              }}
            />
            <Body1>{tenant.name}</Body1>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWizardStep3 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Body1 weight="semibold">Step 3: Assign Tenant Admin</Body1>
      <div>
        <Body1>Select Tenant Administrator *</Body1>
        <select 
          value={wizardData.tenantAdmin}
          onChange={(e) => setWizardData({...wizardData, tenantAdmin: e.target.value})}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #e1dfdd',
            borderRadius: '4px',
            marginTop: '4px'
          }}
        >
          <option value="">Select an administrator...</option>
          {availableAdmins.map((admin) => (
            <option key={admin.id} value={admin.name}>{admin.name}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            type="checkbox" 
            id="spnPermissions"
            checked={wizardData.spnPermissions}
            onChange={(e) => setWizardData({...wizardData, spnPermissions: e.target.checked})}
          />
          <Body1>Enable Service Principal (SPN) creation permissions</Body1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            type="checkbox" 
            id="selfService"
            checked={wizardData.selfService}
            onChange={(e) => setWizardData({...wizardData, selfService: e.target.checked})}
          />
          <Body1>Enable self-service subscription management</Body1>
        </div>
      </div>
    </div>
  );

  const renderWizardStep4 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Body1 weight="semibold">Step 4: Review and Create</Body1>
      <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
        <Body1><strong>Unit Name:</strong> {wizardData.unitName}</Body1>
        <Body1><strong>Description:</strong> {wizardData.description || 'No description provided'}</Body1>
        <Body1><strong>Associated Tenants:</strong> {wizardData.selectedTenants.map(id => availableTenants.find(t => t.id === id)?.name).join(', ') || 'None selected'}</Body1>
        <Body1><strong>Tenant Admin:</strong> {wizardData.tenantAdmin || 'Not assigned'}</Body1>
        <Body1><strong>SPN Permissions:</strong> {wizardData.spnPermissions ? 'Enabled' : 'Disabled'}</Body1>
        <Body1><strong>Self-Service:</strong> {wizardData.selfService ? 'Enabled' : 'Disabled'}</Body1>
      </div>
      <Body1>After creation, the Administrative Unit will be in Phase 1 (Setup) and you can proceed with the 5-phase workflow.</Body1>
    </div>
  );

  const identitySourcesData = [
    {
      id: 1,
      sourceName: 'Corporate Azure AD',
      directoryType: 'Azure Active Directory',
      tenantDomain: 'contoso.onmicrosoft.com',
      status: 'active'
    },
    {
      id: 2,
      sourceName: 'Partner LDAP',
      directoryType: 'LDAP',
      tenantDomain: 'partners.corp.local',
      status: 'pending'
    },
    {
      id: 3,
      sourceName: 'External SAML',
      directoryType: 'SAML 2.0',
      tenantDomain: 'external.company.com',
      status: 'active'
    }
  ];

  const tenantGroupsData = [
    {
      id: 1,
      adminUnitName: 'Contoso Enterprises',
      associatedTenants: 'Fabrikam, Contoso',
      tenantAdmin: 'admin@contoso.com',
      subscriptions: '2 subscriptions',
      spnPermissions: 'Enabled',
      phase: 'Active (Phase 5)',
      status: 'active'
    },
    {
      id: 2,
      adminUnitName: 'Partner Alliance',
      associatedTenants: 'PartnerCorp, Vendor Inc',
      tenantAdmin: 'admin@partnercorp.com',
      subscriptions: '1 subscription',
      spnPermissions: 'Pending Setup',
      phase: 'Setup (Phase 2)',
      status: 'pending'
    },
    {
      id: 3,
      adminUnitName: 'External Contractors',
      associatedTenants: 'Contractor A, Contractor B',
      tenantAdmin: 'Not Assigned',
      subscriptions: '0 subscriptions',
      spnPermissions: 'Disabled',
      phase: 'Initial (Phase 1)',
      status: 'pending'
    }
  ];

  const administrativeUnitsData = [
    {
      id: 1,
      unitName: 'Production Subscription',
      scope: 'Subscription: prod-sub-001',
      tenantAdmin: 'admin@contoso.com',
      rbacScope: 'All Users/Groups',
      selfService: 'Enabled',
      status: 'active'
    },
    {
      id: 2,
      unitName: 'Dev Management Group',
      scope: 'Management Group: dev-mg-002',
      tenantAdmin: 'devadmin@contoso.com',
      rbacScope: 'Development Teams',
      selfService: 'Disabled',
      status: 'active'
    }
  ];

  const federationEndpointsData = [
    {
      id: 1,
      endpointName: 'Corporate Federation',
      assignedSource: 'Corporate Azure AD',
      url: 'https://login.microsoftonline.com/contoso.onmicrosoft.com',
      status: 'active'
    },
    {
      id: 2,
      endpointName: 'Partner LDAP Federation',
      assignedSource: 'Partner LDAP',
      url: 'https://federation.partners.corp.local/saml',
      status: 'pending'
    },
    {
      id: 3,
      endpointName: 'External SAML Federation',
      assignedSource: 'External SAML',
      url: 'https://sso.external.company.com/saml',
      status: 'active'
    }
  ];

  const portalEndpointsData = [
    {
      id: 1,
      endpointName: 'Corporate Portal',
      tenant: 'contoso.onmicrosoft.com',
      reverseProxyUrl: 'https://portal.contoso.com',
      redirectIdp: 'Corporate Azure AD',
      status: 'active'
    },
    {
      id: 2,
      endpointName: 'Partner Portal',
      tenant: 'partners.corp.local',
      reverseProxyUrl: 'https://partners.contoso.com',
      redirectIdp: 'Partner LDAP',
      status: 'active'
    }
  ];

  const renderStatusBadge = (status) => {
    return (
      <Badge appearance={status === 'active' ? 'filled' : 'outline'} color={status === 'active' ? 'brand' : 'warning'}>
        {status}
      </Badge>
    );
  };

  const renderActionsCell = (row) => {
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        {selectedTab === 'groups' && row.adminUnitName ? (
          <>
            <Button size="small" onClick={() => setSelectedAdminUnit(row)}>View Details</Button>
            <Button size="small">Edit</Button>
            <Button size="small">Delete</Button>
          </>
        ) : (
          <>
            <Button size="small">Edit</Button>
            <Button size="small">Delete</Button>
          </>
        )}
      </div>
    );
  };

  const renderTable = (headers, data, renderRow) => {
    return (
      <div style={{ border: '1px solid #e1dfdd', borderRadius: '4px' }}>
        {/* Table Header */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
          backgroundColor: '#f3f2f1',
          padding: '12px',
          borderBottom: '1px solid #e1dfdd'
        }}>
          {headers.map((header, index) => (
            <Body1 key={index} weight="semibold">{header}</Body1>
          ))}
        </div>
        
        {/* Table Body */}
        <div>
          {data.map((row, index) => (
            <div key={row.id} style={{ 
              display: 'grid', 
              gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
              padding: '12px',
              borderBottom: index < data.length - 1 ? '1px solid #e1dfdd' : 'none'
            }}>
              {renderRow(row)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderIdentitySourcesTab = () => {
    const headers = ['Source Name', 'Directory Type', 'Tenant/Domain', 'Status', 'Actions'];
    
    const renderRow = (row) => [
      <Body1 key="name">{row.sourceName}</Body1>,
      <Body1 key="type">{row.directoryType}</Body1>,
      <Body1 key="domain">{row.tenantDomain}</Body1>,
      renderStatusBadge(row.status),
      renderActionsCell(row)
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {renderTable(headers, identitySourcesData, renderRow)}
      </div>
    );
  };

  const renderTenantGroupsTab = () => {
    const headers = ['Administrative Unit Name', 'Associated Tenants', 'Tenant Admin', 'Subscriptions', 'SPN Permissions', 'Workflow Phase', 'Actions'];
    
    const renderRow = (row) => [
      <Body1 key="name" weight="semibold">{row.adminUnitName}</Body1>,
      <Body1 key="tenants">{row.associatedTenants}</Body1>,
      <Body1 key="admin">{row.tenantAdmin}</Body1>,
      <Body1 key="subscriptions">{row.subscriptions}</Body1>,
      <Body1 key="spn">{row.spnPermissions}</Body1>,
      <Body1 key="phase">{row.phase}</Body1>,
      renderActionsCell(row)
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Descriptive header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Body1 style={{ fontSize: '14px', color: '#605e5c' }}>
            Cross-Tenant Foundation & Delegation Management
          </Body1>
        </div>
        
        {/* Workflow Phases Overview */}
        <div style={{ 
          padding: '12px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '4px',
          border: '1px solid #e1dfdd' 
        }}>
          <Body1 weight="semibold">Workflow Phases:</Body1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginTop: '8px' }}>
            <Body1>1. Setup</Body1>
            <Body1>2. Delegation</Body1>
            <Body1>3. Tenant Config</Body1>
            <Body1>4. End-User Action</Body1>
            <Body1>5. Ongoing Admin</Body1>
          </div>
        </div>
        
        {renderTable(headers, tenantGroupsData, renderRow)}
        
        {/* Detailed Administrative Unit View */}
        {selectedAdminUnit && (
          <div style={{ 
            marginTop: '24px',
            padding: '16px', 
            backgroundColor: '#f3f2f1', 
            borderRadius: '4px',
            border: '1px solid #e1dfdd' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Title1>Administrative Unit: {selectedAdminUnit.adminUnitName}</Title1>
              <Button onClick={() => setSelectedAdminUnit(null)}>Close Details</Button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Unit Overview */}
              <div>
                <Body1 weight="semibold">Unit Configuration</Body1>
                <Divider style={{ margin: '8px 0' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Body1><strong>Associated Tenants:</strong> {selectedAdminUnit.associatedTenants}</Body1>
                  <Body1><strong>Tenant Admin:</strong> {selectedAdminUnit.tenantAdmin}</Body1>
                  <Body1><strong>Subscriptions:</strong> {selectedAdminUnit.subscriptions}</Body1>
                  <Body1><strong>SPN Permissions:</strong> {selectedAdminUnit.spnPermissions}</Body1>
                  <Body1><strong>Current Phase:</strong> {selectedAdminUnit.phase}</Body1>
                </div>
              </div>
              
              {/* Workflow Actions */}
              <div>
                <Body1 weight="semibold">Available Actions</Body1>
                <Divider style={{ margin: '8px 0' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Button>Associate Additional Tenants</Button>
                  <Button>Assign/Change Tenant Admin</Button>
                  <Button>Create New Subscription</Button>
                  <Button>Configure SPN Permissions</Button>
                  <Button>View User/Group Directory Source</Button>
                </div>
              </div>
            </div>
            
            {/* Phase-Specific Details */}
            <div style={{ marginTop: '16px' }}>
              <Body1 weight="semibold">Workflow Phase Details</Body1>
              <Divider style={{ margin: '8px 0' }} />
              {selectedAdminUnit.phase.includes('Phase 1') && (
                <Body1><strong>Phase 1 - Setup:</strong> Create Administrative Unit, associate tenants (Fabrikam, Contoso), review directory sourcing</Body1>
              )}
              {selectedAdminUnit.phase.includes('Phase 2') && (
                <Body1><strong>Phase 2 - Delegation:</strong> Assign tenant admin rights to {selectedAdminUnit.tenantAdmin}, create subscriptions under unit</Body1>
              )}
              {selectedAdminUnit.phase.includes('Phase 3') && (
                <Body1><strong>Phase 3 - Tenant Configuration:</strong> Tenant admin configures SPN permissions and user access within delegated scope</Body1>
              )}
              {selectedAdminUnit.phase.includes('Phase 4') && (
                <Body1><strong>Phase 4 - End-User Actions:</strong> Users create Service Principals within allowed scope</Body1>
              )}
              {selectedAdminUnit.phase.includes('Phase 5') && (
                <Body1><strong>Phase 5 - Ongoing Administration:</strong> Tenant admin manages SPNs, users, and access within the Administrative Unit</Body1>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAdministrativeUnitsTab = () => {
    const headers = ['Unit Name', 'Scope (Subscription/Mgmt Group)', 'Tenant Admin', 'RBAC Scope', 'Self-service', 'Actions'];
    
    const renderRow = (row) => [
      <Body1 key="name">{row.unitName}</Body1>,
      <Body1 key="scope">{row.scope}</Body1>,
      <Body1 key="admin">{row.tenantAdmin}</Body1>,
      <Body1 key="rbac">{row.rbacScope}</Body1>,
      <Body1 key="selfservice">{row.selfService}</Body1>,
      renderActionsCell(row)
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {renderTable(headers, administrativeUnitsData, renderRow)}
      </div>
    );
  };

  const renderFederationEndpointsTab = () => {
    const headers = ['Endpoint Name', 'Assigned Source Directory', 'URL', 'Status', 'Actions'];
    
    const renderRow = (row) => [
      <Body1 key="name">{row.endpointName}</Body1>,
      <Body1 key="source">{row.assignedSource}</Body1>,
      <Body1 key="url">{row.url}</Body1>,
      renderStatusBadge(row.status),
      renderActionsCell(row)
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {renderTable(headers, federationEndpointsData, renderRow)}
      </div>
    );
  };

  const renderPortalEndpointsTab = () => {
    const headers = ['Endpoint Name', 'Tenant', 'Reverse Proxy URL', 'Redirect IDP', 'Status', 'Actions'];
    
    const renderRow = (row) => [
      <Body1 key="name">{row.endpointName}</Body1>,
      <Body1 key="tenant">{row.tenant}</Body1>,
      <Body1 key="proxy">{row.reverseProxyUrl}</Body1>,
      <Body1 key="redirect">{row.redirectIdp}</Body1>,
      renderStatusBadge(row.status),
      renderActionsCell(row)
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {renderTable(headers, portalEndpointsData, renderRow)}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'sources':
        return renderIdentitySourcesTab();
      case 'groups':
        return renderTenantGroupsTab();
      case 'units':
        return renderAdministrativeUnitsTab();
      case 'federation':
        return renderFederationEndpointsTab();
      case 'portals':
        return renderPortalEndpointsTab();
      default:
        return renderIdentitySourcesTab();
    }
  };

  return (
    <FluentProvider theme={webLightTheme}>
      {/* Azure Enterprise Layout */}
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#fafafa',
        fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif'
      }}>
        {/* Blade Header */}
        {renderBladeHeader()}

        {/* Main Content */}
        <div style={{
          backgroundColor: 'white',
          minHeight: 'calc(100vh - 180px)'
        }}>
          {/* Tab Navigation */}
          <div style={{ padding: '16px 24px 0 24px', borderBottom: '1px solid #e1dfdd' }}>
            <TabList selectedValue={selectedTab} onTabSelect={(event, data) => setSelectedTab(data.value)}>
              <Tab value="sources">Identity Sources</Tab>
              <Tab value="groups">Tenant Groups</Tab>
              <Tab value="units">Administrative Units</Tab>
              <Tab value="federation">Federation Endpoints</Tab>
              <Tab value="portals">Portal Endpoints</Tab>
            </TabList>
          </div>

          {/* Toolbar */}
          {renderToolbar()}

          {/* Filtering */}
          {renderFiltering()}

          {/* Tab Content */}
          <div style={{ padding: '24px' }}>
            {renderTabContent()}
          </div>
        </div>
        
        {/* Wizard Modal */}
        {renderWizard()}
      </div>
    </FluentProvider>
  );
};

export default IdentityManagement;