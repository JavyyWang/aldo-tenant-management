import React from 'react';
import {
  Card,
  Body1,
  Title2,
  Divider,
} from '@fluentui/react-components';

const OperatorDashboard = () => {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Title2>Multi-Tenant Identity Management</Title2>
        <Body1>Operator Dashboard</Body1>
      </div>
      
      <Divider />

      {/* Identity Sources Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Title2>Identity Sources</Title2>
        
        <Card>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body1>Add Additional Sources</Body1>
            <Divider />
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Source Directory/Tenant</Body1>
                <Body1>[Input Field]</Body1>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Source Type</Body1>
                <Body1>[Dropdown Selection]</Body1>
              </div>
            </div>
            
            <Body1>[Add Source Button]</Body1>
          </div>
        </Card>

        <Card>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body1>Existing Sources</Body1>
            <Divider />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Body1>[Source 1] - [Type] - [Status] [Manage] [Delete]</Body1>
              <Body1>[Source 2] - [Type] - [Status] [Manage] [Delete]</Body1>
              <Body1>[Source 3] - [Type] - [Status] [Manage] [Delete]</Body1>
            </div>
          </div>
        </Card>
      </div>

      <Divider />

      {/* Tenant Management Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Title2>Tenant Management</Title2>
        
        <Card>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body1>Add New Tenant</Body1>
            <Divider />
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Tenant Name</Body1>
                <Body1>[Input Field]</Body1>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Search Boundary</Body1>
                <Body1>[Dropdown: Isolated/Grouped]</Body1>
              </div>
            </div>
            
            <Body1>[Create Tenant Button]</Body1>
          </div>
        </Card>

        <Card>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body1>Tenant Grouping Configuration</Body1>
            <Divider />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Body1>Group Tenants</Body1>
              <Body1>[Radio: Keep Separate / Group Together]</Body1>
              <Body1>Cross-Tenant Search</Body1>
              <Body1>[Toggle: Enabled / Disabled]</Body1>
              <Body1>Cross-Tenant Application Lookups</Body1>
              <Body1>[Toggle: Enabled / Disabled]</Body1>
            </div>
          </div>
        </Card>
      </div>

      <Divider />

      {/* Administrative Units Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Title2>Administrative Units</Title2>
        
        <Card>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body1>Assign Administrative Unit</Body1>
            <Divider />
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Subscription Level</Body1>
                <Body1>[Dropdown Selection]</Body1>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Management Group</Body1>
                <Body1>[Dropdown Selection]</Body1>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Body1>RBAC Scope</Body1>
              <Body1>[Multi-Select Users/Groups]</Body1>
            </div>
            
            <Body1>[Assign Unit Button]</Body1>
          </div>
        </Card>

        <Card>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body1>Tenant Admin Assignment</Body1>
            <Divider />
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Administrative Unit</Body1>
                <Body1>[Dropdown Selection]</Body1>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Tenant Admin User</Body1>
                <Body1>[User Search/Select]</Body1>
              </div>
            </div>
            
            <Body1>[Assign Admin Button]</Body1>
          </div>
        </Card>

        <Card>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body1>Existing Administrative Units</Body1>
            <Divider />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Body1>[Unit 1] - [Subscription] - [Admin] [Update] [Delete]</Body1>
              <Body1>[Unit 2] - [Subscription] - [Admin] [Update] [Delete]</Body1>
              <Body1>[Unit 3] - [Subscription] - [Admin] [Update] [Delete]</Body1>
            </div>
          </div>
        </Card>
      </div>

      <Divider />

      {/* Federation Configuration Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Title2>Federation Configuration</Title2>
        
        <Card>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body1>Configure Federation Endpoint</Body1>
            <Divider />
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Source Directory</Body1>
                <Body1>[Dropdown Selection]</Body1>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Endpoint URL</Body1>
                <Body1>[Input Field]</Body1>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Body1>Authentication Method</Body1>
              <Body1>[Radio Selection]</Body1>
              <Body1>Certificate/Key Configuration</Body1>
              <Body1>[File Upload Area]</Body1>
            </div>
            
            <Body1>[Configure Endpoint Button]</Body1>
          </div>
        </Card>

        <Card>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body1>Federation Endpoints</Body1>
            <Divider />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Body1>[Endpoint 1] - [Directory] - [Status] [Test] [Edit] [Delete]</Body1>
              <Body1>[Endpoint 2] - [Directory] - [Status] [Test] [Edit] [Delete]</Body1>
            </div>
          </div>
        </Card>
      </div>

      <Divider />

      {/* Portal Endpoints Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Title2>Portal Endpoints</Title2>
        
        <Card>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body1>Add Portal Endpoint</Body1>
            <Divider />
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Endpoint URL</Body1>
                <Body1>[Input Field]</Body1>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Assigned Tenant</Body1>
                <Body1>[Dropdown Selection]</Body1>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Body1>IDP Redirect Configuration</Body1>
              <Body1>[Input Field]</Body1>
              <Body1>Gateway Settings</Body1>
              <Body1>[Configuration Panel]</Body1>
            </div>
            
            <Body1>[Add Portal Endpoint Button]</Body1>
          </div>
        </Card>

        <Card>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body1>Portal Endpoints</Body1>
            <Divider />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Body1>[Portal 1] - [Tenant] - [Status] [Configure] [Delete]</Body1>
              <Body1>[Portal 2] - [Tenant] - [Status] [Configure] [Delete]</Body1>
            </div>
          </div>
        </Card>
      </div>

      <Divider />

      {/* Self-Service Management Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Title2>Self-Service Management</Title2>
        
        <Card>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body1>Self-Service Configuration</Body1>
            <Divider />
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Administrative Unit</Body1>
                <Body1>[Dropdown Selection]</Body1>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Body1>Self-Service Enabled</Body1>
                <Body1>[Toggle: Yes/No]</Body1>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Body1>Subscription Management Permissions</Body1>
              <Body1>[Checkbox List]</Body1>
              <Body1>Tenant Admin Capabilities</Body1>
              <Body1>[Permission Matrix]</Body1>
            </div>
            
            <Body1>[Update Configuration Button]</Body1>
          </div>
        </Card>

        <Card>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body1>Self-Service Status</Body1>
            <Divider />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Body1>[Unit 1] - [Tenant Admin] - [Self-Service: Enabled] [Configure]</Body1>
              <Body1>[Unit 2] - [Tenant Admin] - [Self-Service: Disabled] [Configure]</Body1>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
};

export default OperatorDashboard;