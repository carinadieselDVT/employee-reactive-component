# Angular Reactive Forms — Intern Assessment

## Overview

You are given a partially scaffolded Angular 21 project. Your task is to implement two standalone components that work with employee profile data using **Angular Reactive Forms**.

A data service (`EmployeeService`) and model (`Employee`) are already provided. You must not modify the service or model.

---

## Scenario

Build an **Employee Profile** feature with two views:

| Route | Component | Purpose |
|-------|-----------|---------|
| `/view` | `EmployeeViewComponent` | Display employee data in a **read-only** reactive form |
| `/edit` | `EmployeeEditComponent` | Edit employee data and **mock-save** it |

---

## Task 1 — EmployeeViewComponent (`/view`)

### Requirements

- Inject `EmployeeService` and call `getEmployee(1)` on init. 
- Build a **reactive form** that mirrors the employee data structure.
- All form controls must be **disabled** (read-only display).
- The form must include:
  - Text fields: `name`, `email`
  - A `<select>` bound via `formControlName` for `department`
  - Checkboxes for each skill in `AVAILABLE_SKILLS` — pre-check the ones the employee has
  - A `FormArray` for `experiences`, each entry showing `company`, `role`, and `years`
- Show a loading indicator while data is being fetched.
- Include a navigation button/link to `/edit`.


---

## Task 2 — EmployeeEditComponent (`/edit`)

### Requirements

- Inject `EmployeeService` and call `getEmployee(1)` on init to pre-populate the form.
- Build an **editable** reactive form with the same structure as the view form, but **enabled**.
- The form must include:
  - Text fields: `name`, `email` — both **required**
  - `email` must use the built-in `Validators.email` validator
  - A `<select>` for `department` — **required**
  - Checkboxes for each skill in `AVAILABLE_SKILLS` — pre-check the ones the employee has
  - A `FormArray` for `experiences` with:
    - `company` (required), `role` (required), `years` (required, min: 0)
    - An **Add Experience** button that appends a new empty group
    - A **Remove** button per entry that removes it from the array
- On submit:
  - Validate the entire form — show validation errors inline
  - If valid, call `employeeService.saveEmployee(...)` and show a success message
  - If invalid, mark all controls as touched to reveal errors
- Include a navigation button/link back to `/view`.

