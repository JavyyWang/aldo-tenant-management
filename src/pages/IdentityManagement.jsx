import React, { useState } from 'react';
import {
  FluentProvider,
  webLightTheme,
  Title1,
  Title2,
  Title3,
  Subtitle1,
  Subtitle2,
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
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogBody,
  Field,
  Textarea,
  Input,
  Radio,
  RadioGroup,
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
  Comment20Regular,
  Send20Regular,
} from '@fluentui/react-icons';

const IdentityManagement = () => {
  // Updated grid styles applied - Version 2.0 
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

  // Feedback widget state
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    type: 'suggestion',
    page: '',
    message: '',
    email: ''
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

  // Feedback functions
  const handleFeedbackSubmit = () => {
    const { type, page, message, email } = feedbackData;
    const currentPage = selectedTab;
    
    // Create GitHub issue URL with pre-filled data
    const title = encodeURIComponent(`[${type.toUpperCase()}] Feedback on ${currentPage || page}`);
    const body = encodeURIComponent(`
**Feedback Type**: ${type}
**Page/Section**: ${currentPage || page}
**Contact**: ${email}

**Message**:
${message}

---
*Submitted via prototype feedback widget*
    `);
    
    const githubIssueUrl = `https://github.com/JavyyWang/aldo-tenant-management/issues/new?title=${title}&body=${body}`;
    
    // Open GitHub issue in new tab
    window.open(githubIssueUrl, '_blank');
    
    // Reset form and close dialog
    setFeedbackData({
      type: 'suggestion',
      page: '',
      message: '',
      email: ''
    });
    setShowFeedbackDialog(false);
  };

  const getPageDisplayName = () => {
    const pageNames = {
      'sources': 'Identity Sources',
      'groups': 'Tenant Groups',
      'units': 'Administrative Units',
      'federation': 'Federation Endpoints',
      'portals': 'Portal Endpoints'
    };
    return pageNames[selectedTab] || 'General';
  };

  const renderFeedbackDialog = () => {
    return (
      <Dialog open={showFeedbackDialog} onOpenChange={(_, data) => setShowFeedbackDialog(data.open)}>
        <DialogSurface style={{ maxWidth: '500px' }}>
          <DialogBody>
            <DialogTitle>💬 Share Your Feedback</DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Body2>Help us improve the prototype by sharing your thoughts and suggestions.</Body2>
              
              <Field label="Feedback Type">
                <RadioGroup
                  value={feedbackData.type}
                  onChange={(e, data) => setFeedbackData({...feedbackData, type: data.value})}
                >
                  <Radio value="suggestion" label="💡 Suggestion" />
                  <Radio value="bug" label="🐛 Bug Report" />
                  <Radio value="question" label="❓ Question" />
                  <Radio value="improvement" label="⚡ Improvement" />
                </RadioGroup>
              </Field>

              <Field label="Page/Section">
                <Input
                  value={feedbackData.page || getPageDisplayName()}
                  onChange={(e) => setFeedbackData({...feedbackData, page: e.target.value})}
                  placeholder={`Currently on: ${getPageDisplayName()}`}
                />
              </Field>

              <Field label="Your Message *">
                <Textarea
                  value={feedbackData.message}
                  onChange={(e) => setFeedbackData({...feedbackData, message: e.target.value})}
                  placeholder="Describe your feedback, suggestion, or issue..."
                  rows={4}
                  resize="vertical"
                />
              </Field>

              <Field label="Email (Optional)">
                <Input
                  type="email"
                  value={feedbackData.email}
                  onChange={(e) => setFeedbackData({...feedbackData, email: e.target.value})}
                  placeholder="your.email@company.com"
                />
              </Field>
            </DialogContent>
            <DialogActions>
              <Button 
                appearance="secondary" 
                onClick={() => setShowFeedbackDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                appearance="primary" 
                icon={<Send20Regular />}
                onClick={handleFeedbackSubmit}
                disabled={!feedbackData.message.trim()}
              >
                Submit Feedback
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    );
  };

  const renderFeedbackButton = () => {
    return (
      <Button
        appearance="primary"
        icon={<Comment20Regular />}
        onClick={() => {
          setFeedbackData({...feedbackData, page: getPageDisplayName()});
          setShowFeedbackDialog(true);
        }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          borderRadius: '50px',
          padding: '12px 20px',
          zIndex: 999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontWeight: '600'
        }}
      >
        💬 Feedback
      </Button>
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
      federationUrl: 'https://login.microsoftonline.com/contoso.onmicrosoft.com',
      status: 'active'
    },
    {
      id: 2,
      sourceName: 'Partner LDAP',
      directoryType: 'LDAP',
      tenantDomain: 'partners.corp.local',
      federationUrl: 'https://federation.partners.corp.local/saml',
      status: 'pending'
    },
    {
      id: 3,
      sourceName: 'External SAML',
      directoryType: 'SAML 2.0',
      tenantDomain: 'external.company.com',
      federationUrl: 'https://sso.external.company.com/saml',
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
      <Badge 
        appearance={status === 'active' ? 'filled' : 'outline'} 
        color={status === 'active' ? 'success' : 'warning'}
        style={{
          textTransform: 'capitalize',
          fontSize: '12px',
          padding: '4px 8px'
        }}
      >
        {status}
      </Badge>
    );
  };

  const renderActionsCell = (row) => {
    return (
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {selectedTab === 'groups' && row.adminUnitName ? (
          <>
            <Button 
              size="small" 
              appearance="outline"
              style={{
                minHeight: '24px',
                fontSize: '12px',
                padding: '4px 8px'
              }}
              onClick={() => setSelectedAdminUnit(row)}
            >
              View Details
            </Button>
            <Button 
              size="small" 
              appearance="outline"
              style={{
                minHeight: '24px',
                fontSize: '12px',
                padding: '4px 8px'
              }}
            >
              Edit
            </Button>
            <Button 
              size="small" 
              appearance="outline"
              style={{
                minHeight: '24px',
                fontSize: '12px',
                padding: '4px 8px'
              }}
            >
              Delete
            </Button>
          </>
        ) : (
          <>
            <Button 
              size="small" 
              appearance="outline"
              style={{
                minHeight: '24px',
                fontSize: '12px',
                padding: '4px 8px'
              }}
            >
              Edit
            </Button>
            <Button 
              size="small" 
              appearance="outline"
              style={{
                minHeight: '24px',
                fontSize: '12px',
                padding: '4px 8px'
              }}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    );
  };

  const renderTable = (headers, data, renderRow) => {
    return (
      <div style={{ 
        border: '1px solid #e1dfdd', 
        borderRadius: '6px',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
      }}>
        {/* Table Header */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
          backgroundColor: '#fafafa',
          padding: '16px 20px',
          borderBottom: '1px solid #e1dfdd',
          minHeight: '52px',
          alignItems: 'center'
        }}>
          {headers.map((header, index) => (
            <Body2 key={index} style={{ 
              fontWeight: '600', 
              color: '#323130',
              fontSize: '14px'
            }}>{header}</Body2>
          ))}
        </div>
        
        {/* Table Body */}
        <div>
          {data.map((row, index) => (
            <div 
              key={row.id} 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
                padding: '16px 20px',
                borderBottom: index < data.length - 1 ? '1px solid #edebe9' : 'none',
                minHeight: '60px',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                transition: 'background-color 0.1s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f8f8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              {renderRow(row)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderIdentitySourcesTab = () => {
    const headers = ['Source Name', 'Directory Type', 'Tenant/Domain', 'Federation URL', 'Status', 'Actions'];
    
    const renderRow = (row) => [
      <Body2 key="name" style={{ fontWeight: '500', color: '#323130' }}>{row.sourceName}</Body2>,
      <Body2 key="type" style={{ color: '#605e5c' }}>{row.directoryType}</Body2>,
      <Body2 key="domain" style={{ color: '#605e5c' }}>{row.tenantDomain}</Body2>,
      <Body2 key="url" style={{ color: '#0078d4', textDecoration: 'none', cursor: 'pointer' }} title={row.federationUrl}>
        {row.federationUrl.length > 40 ? row.federationUrl.substring(0, 40) + '...' : row.federationUrl}
      </Body2>,
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
      <Body2 key="name" style={{ fontWeight: '600', color: '#323130' }}>{row.adminUnitName}</Body2>,
      <Body2 key="tenants" style={{ color: '#605e5c' }}>{row.associatedTenants}</Body2>,
      <Body2 key="admin" style={{ color: '#605e5c' }}>{row.tenantAdmin}</Body2>,
      <Body2 key="subscriptions" style={{ color: '#605e5c' }}>{row.subscriptions}</Body2>,
      <Body2 key="spn" style={{ color: '#605e5c' }}>{row.spnPermissions}</Body2>,
      <Body2 key="phase" style={{ color: '#605e5c' }}>{row.phase}</Body2>,
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
        

      </div>
    );
  };

  // Side Panel Component for Detailed Administrative Unit View
  const renderSidePanel = () => {
    if (!selectedAdminUnit) return null;

    return (
      <>
        {/* Backdrop overlay */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1000,
            transition: 'opacity 0.3s ease-in-out'
          }}
          onClick={() => setSelectedAdminUnit(null)}
        />
        
        {/* Side Panel */}
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '520px',
          backgroundColor: '#ffffff',
          boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.14)',
          zIndex: 1001,
          transform: 'translateX(0)',
          transition: 'transform 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Panel Header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e1dfdd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#faf9f8'
          }}>
            <div>
              <Title2>Administrative Unit</Title2>
              <Subtitle1 style={{ color: '#605e5c' }}>{selectedAdminUnit.adminUnitName}</Subtitle1>
            </div>
            <Button 
              appearance="subtle" 
              icon={<Dismiss20Regular />}
              onClick={() => setSelectedAdminUnit(null)}
            />
          </div>
          
          {/* Panel Content */}
          <div style={{ 
            flex: 1, 
            overflow: 'auto',
            padding: '24px'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <Subtitle1 style={{ marginBottom: '16px' }}>Unit Configuration</Subtitle1>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Body2 style={{ fontWeight: '600', color: '#424242' }}>Associated Tenants</Body2>
                  <Body2>{selectedAdminUnit.associatedTenants}</Body2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Body2 style={{ fontWeight: '600', color: '#424242' }}>Tenant Admin</Body2>
                  <Body2>{selectedAdminUnit.tenantAdmin}</Body2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Body2 style={{ fontWeight: '600', color: '#424242' }}>Subscriptions</Body2>
                  <Body2>{selectedAdminUnit.subscriptions}</Body2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Body2 style={{ fontWeight: '600', color: '#424242' }}>SPN Permissions</Body2>
                  <Body2>{selectedAdminUnit.spnPermissions}</Body2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Body2 style={{ fontWeight: '600', color: '#424242' }}>Current Phase</Body2>
                  <Body2>{selectedAdminUnit.phase}</Body2>
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <Subtitle1 style={{ marginBottom: '16px' }}>Available Actions</Subtitle1>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Button appearance="outline" style={{ justifyContent: 'flex-start' }}>
                  Associate Additional Tenants
                </Button>
                <Button appearance="outline" style={{ justifyContent: 'flex-start' }}>
                  Assign/Change Tenant Admin
                </Button>
                <Button appearance="outline" style={{ justifyContent: 'flex-start' }}>
                  Create New Subscription
                </Button>
                <Button appearance="outline" style={{ justifyContent: 'flex-start' }}>
                  Configure SPN Permissions
                </Button>
                <Button appearance="outline" style={{ justifyContent: 'flex-start' }}>
                  View User/Group Directory Source
                </Button>
              </div>
            </div>
            
            <div>
              <Subtitle1 style={{ marginBottom: '16px' }}>Workflow Phase Details</Subtitle1>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedAdminUnit.phase.includes('Phase 1') && (
                  <div style={{ padding: '12px', backgroundColor: '#f3f2f1', borderRadius: '4px', border: '1px solid #e1dfdd' }}>
                    <Body2 style={{ fontWeight: '600', marginBottom: '4px' }}>Phase 1 - Setup</Body2>
                    <Body2 style={{ color: '#605e5c' }}>Create Administrative Unit, associate tenants (Fabrikam, Contoso), review directory sourcing</Body2>
                  </div>
                )}
                {selectedAdminUnit.phase.includes('Phase 2') && (
                  <div style={{ padding: '12px', backgroundColor: '#f3f2f1', borderRadius: '4px', border: '1px solid #e1dfdd' }}>
                    <Body2 style={{ fontWeight: '600', marginBottom: '4px' }}>Phase 2 - Delegation</Body2>
                    <Body2 style={{ color: '#605e5c' }}>Assign tenant admin rights to {selectedAdminUnit.tenantAdmin}, create subscriptions under unit</Body2>
                  </div>
                )}
                {selectedAdminUnit.phase.includes('Phase 3') && (
                  <div style={{ padding: '12px', backgroundColor: '#f3f2f1', borderRadius: '4px', border: '1px solid #e1dfdd' }}>
                    <Body2 style={{ fontWeight: '600', marginBottom: '4px' }}>Phase 3 - Tenant Configuration</Body2>
                    <Body2 style={{ color: '#605e5c' }}>Tenant admin configures SPN permissions and user access within delegated scope</Body2>
                  </div>
                )}
                {selectedAdminUnit.phase.includes('Phase 4') && (
                  <div style={{ padding: '12px', backgroundColor: '#f3f2f1', borderRadius: '4px', border: '1px solid #e1dfdd' }}>
                    <Body2 style={{ fontWeight: '600', marginBottom: '4px' }}>Phase 4 - End-User Actions</Body2>
                    <Body2 style={{ color: '#605e5c' }}>Users create Service Principals within allowed scope</Body2>
                  </div>
                )}
                {selectedAdminUnit.phase.includes('Phase 5') && (
                  <div style={{ padding: '12px', backgroundColor: '#f3f2f1', borderRadius: '4px', border: '1px solid #e1dfdd' }}>
                    <Body2 style={{ fontWeight: '600', marginBottom: '4px' }}>Phase 5 - Ongoing Administration</Body2>
                    <Body2 style={{ color: '#605e5c' }}>Tenant admin manages SPNs, users, and access within the Administrative Unit</Body2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderAdministrativeUnitsTab = () => {
    const headers = ['Unit Name', 'Scope (Subscription/Mgmt Group)', 'Tenant Admin', 'RBAC Scope', 'Self-service', 'Actions'];
    
    const renderRow = (row) => [
      <Body2 key="name" style={{ fontWeight: '500', color: '#323130' }}>{row.unitName}</Body2>,
      <Body2 key="scope" style={{ color: '#605e5c' }}>{row.scope}</Body2>,
      <Body2 key="admin" style={{ color: '#605e5c' }}>{row.tenantAdmin}</Body2>,
      <Body2 key="rbac" style={{ color: '#605e5c' }}>{row.rbacScope}</Body2>,
      <Body2 key="selfservice" style={{ color: '#605e5c' }}>{row.selfService}</Body2>,
      renderActionsCell(row)
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {renderTable(headers, administrativeUnitsData, renderRow)}
      </div>
    );
  };

  const renderPortalEndpointsTab = () => {
    const headers = ['Endpoint Name', 'Tenant', 'Reverse Proxy URL', 'Redirect IDP', 'Status', 'Actions'];
    
    const renderRow = (row) => [
      <Body2 key="name" style={{ fontWeight: '500', color: '#323130' }}>{row.endpointName}</Body2>,
      <Body2 key="tenant" style={{ color: '#605e5c' }}>{row.tenant}</Body2>,
      <Body2 key="proxy" style={{ color: '#605e5c' }}>{row.reverseProxyUrl}</Body2>,
      <Body2 key="redirect" style={{ color: '#605e5c' }}>{row.redirectIdp}</Body2>,
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
        
        {/* Feedback Widget */}
        {renderFeedbackDialog()}
        {renderFeedbackButton()}
        
        {/* Side Panel */}
        {renderSidePanel()}
      </div>
    </FluentProvider>
  );
};

export default IdentityManagement;