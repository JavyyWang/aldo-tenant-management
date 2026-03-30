
# ALDO – Multi‑tenant Identity Management  
**Design prototype / UX exploration**

---

## Overview

This repository contains an **interactive design prototype** exploring how **ALDO supports multi‑tenant identity and federation** in a **private / sovereign cloud** environment.

Rather than using static mock‑ups, the design is expressed as a **clickable React prototype** to better communicate:
- Information architecture
- Role‑based experiences
- Navigation and scope boundaries
- Azure‑aligned mental models for identity management

This repo represents **design intent and exploration**, not production‑ready implementation.

---

## Problem Context

Enterprise customers rarely operate with a single directory. In regulated and sovereign environments, customers need to:

- Source users and groups from **multiple identity providers (IDPs)**
- Maintain **strict isolation boundaries** between tenants
- Avoid complex AD forest trusts or cross‑tenant search
- Achieve an experience that **feels consistent with Azure**, despite running in a private cloud

The core challenge is enabling **Azure‑like multi‑tenant identity experiences** while respecting **air‑gapped, regulated, and multi‑directory constraints**.

---

## What This Prototype Explores

### 1. Multi‑tenant identity with isolation
- Users authenticate using **their own IDP**
- Users can only discover and search **within their own tenant**
- Users, groups, applications, and SPNs are **tenant‑scoped**
- No cross‑tenant search or data leakage

### 2. Administrative Units (Tenant Groups)
- Tenants can be grouped into **logical administrative units**
- Tenant groups act as the **primary delegation and management boundary**
- Inspired by Azure administrative units, adapted for ALDO constraints

### 3. Clear role separation
The prototype reflects three primary personas:
- **Operator** – configures tenants, IDPs, and tenant groupings
- **Tenant Admin** – manages identity, access, and subscriptions within scope
- **User** – consumes resources and creates tenant‑scoped applications

### 4. Portal as a secondary control surface
While APIs and CLI are expected to be the primary control surface long‑term,
this prototype focuses on **portal UX** to:
- Validate mental models
- Explore discoverability and delegation
- Support design and stakeholder alignment

---

## What This Prototype Is Not

This repo intentionally does **not**:
- Recreate Entra ID or provide authentication features like MFA
- Define final RBAC enforcement or backend data models
- Specify implementation details for sync, federation, or APIs
- Represent production polish or full accessibility coverage

Think of this as **design scaffolding**, not a finished system.

---

## How to Read the Repo (Design‑first)

This is a React application. The **design lives in the pages**, not documentation.

---


Each `.jsx` file represents a **screen or experience**. When reviewing, focus on:
- Page structure
- Terminology and labels
- Navigation patterns
- What is included vs intentionally omitted

---

## Viewing the Design

### Live prototype (recommended)
The prototype is deployed via GitHub Pages:

https://javyywang.github.io/aldo-tenant-management/

This is the **primary artefact for design review**.

### Run locally (optional)
If you want to explore or modify the prototype locally:

```bash
npm install
npm start
```

### How to Contribute
Design‑first contributions are welcome, especially:

### Clarifying design intent
Improving terminology and labels
Exploring alternative flows
Documenting assumptions and open questions

---

### Preferred contribution styles:

Small PRs with focused changes
GitHub Issues for design discussions
Documentation additions that clarify intent

---

### Open Design Questions
This prototype intentionally leaves space to explore:

Tenant grouping vs invitation‑based access
Delegation boundaries across tenants
Operator vs tenant admin responsibilities
How much Azure parity is helpful vs misleading

These questions are best explored visually before committing to implementation.

Related Artefacts

PRD: ALDO – Multi‑tenant IDP
Reference model: Azure multi‑tenancy and administrative units

---

### TL;DR
This repository is a design proposal expressed as a working UI.
Read it like a clickable Figma file — just implemented in JSX instead of frames.
