'use client'

import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react'

type Portal = 'studentLogin' | 'register' | 'adminLogin' | 'student' | 'admin'
type Item = {
  id: string
  name: string
  category: string
  location: string
  date: string
  type: 'Lost' | 'Found'
  reporter: string
  image?: string
}

const photo =
  'https://images.unsplash.com/photo-1620275765334-4ed948bb4502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
const items: Item[] = [
  {
    id: 'CF-1042',
    name: 'Black Wireless Earbuds',
    category: 'Electronics',
    location: 'Engineering Building, Room 204',
    date: 'Oct 14, 2026',
    type: 'Found',
    reporter: 'Miguel Santos',
  },
  {
    id: 'CF-1041',
    name: 'Blue Hydro Flask',
    category: 'Personal item',
    location: 'Student Center, Ground Floor',
    date: 'Oct 14, 2026',
    type: 'Found',
    reporter: 'Angela Reyes',
  },
  {
    id: 'CF-1038',
    name: 'Calculus II Notebook',
    category: 'School supply',
    location: 'Main Library, 2nd Floor',
    date: 'Oct 13, 2026',
    type: 'Lost',
    reporter: 'John Carlo Cruz',
    image: photo,
  },
  {
    id: 'CF-1034',
    name: 'Silver Key Ring',
    category: 'Keys',
    location: 'West Parking Area',
    date: 'Oct 12, 2026',
    type: 'Found',
    reporter: 'Campus Security',
  },
  {
    id: 'CF-1028',
    name: 'Campus ID Card',
    category: 'Personal item',
    location: 'Cafeteria',
    date: 'Oct 11, 2026',
    type: 'Lost',
    reporter: 'Maria Dela Cruz',
  },
  {
    id: 'CF-1021',
    name: 'Gray Zip Hoodie',
    category: 'Clothing',
    location: 'University Gymnasium',
    date: 'Oct 10, 2026',
    type: 'Found',
    reporter: 'Athletics Office',
  },
]
const icons: Record<string, ReactNode> = {
  pin: (
    <>
      <path d="M12 21s7-5 7-11a7 7 0 0 0-14 0c0 6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6" height="6" />
      <rect x="14" y="4" width="6" height="6" />
      <rect x="4" y="14" width="6" height="6" />
      <rect x="14" y="14" width="6" height="6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  file: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v5h5M10 13h5M10 17h5" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12 2.2 2.2 5-5" />
    </>
  ),
  box: (
    <>
      <path d="m4 7 8-4 8 4v10l-8 4-8-4Z" />
      <path d="m4 7 8 4 8-4M12 11v10" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5a3 3 0 0 1 0 5.5M19 20v-1a6 6 0 0 0-3-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  bell: (
    <>
      <path d="M18 10a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7.5 7.5 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-4l-.3 3a7 7 0 0 0-1.7 1l-2.4-1-2 3.5 2 1.5a7.5 7.5 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 1.7 1l.3 3h4l.3-3a7 7 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5c.1-.3.1-.7.1-1Z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  logout: (
    <>
      <path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  upload: (
    <>
      <path d="M12 16V4M8 8l4-4 4 4M5 14v5h14v-5" />
    </>
  ),
}
function Icon({ n, s = 18 }: { n: string; s?: number }) {
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[n]}
    </svg>
  )
}
function Logo({ admin = false }: { admin?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-black text-white">
        <Icon n="pin" s={19} />
      </span>
      <div>
        <b className="block text-[17px] tracking-[-.6px]">CampusFound</b>
        {admin && (
          <span className="block -mt-0.5 text-[10px] font-semibold uppercase tracking-[.12em] text-neutral-500">
            Administration
          </span>
        )}
      </div>
    </div>
  )
}
function Badge({ children }: { children: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${children === 'Approved' || children === 'Found' || children === 'Returned' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700'}`}
    >
      {children}
    </span>
  )
}
function ItemArt({ item }: { item: Item }) {
  return item.image ? (
    <img src={item.image} alt={item.name} className="h-full w-full object-cover grayscale" />
  ) : (
    <div className="grid h-full w-full place-items-center bg-neutral-100">
      <span className="border border-neutral-300 bg-white px-3 py-2 text-[10px] font-bold tracking-[.14em] text-neutral-500">
        {item.category.toUpperCase()}
      </span>
    </div>
  )
}
function Field({
  label,
  type = 'text',
  placeholder,
  name,
}: {
  label: string
  type?: string
  placeholder: string
  name?: string
}) {
  const [show, setShow] = useState(false)
  return (
    <label className="block text-sm font-medium">
      {label}
      <span className="relative mt-1.5 block">
        <input
          required
          name={name}
          type={type === 'password' && show ? 'text' : type}
          placeholder={placeholder}
          className="h-12 w-full rounded-lg border border-neutral-300 px-3.5 text-sm outline-none placeholder:text-neutral-400 focus:border-black"
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-1 top-1 h-10 px-3 text-neutral-500"
          >
            <Icon n="eye" />
          </button>
        )}
      </span>
    </label>
  )
}
function Auth({
  portal,
  setPortal,
  setS,
  setA,
}: {
  portal: Portal
  setPortal: (p: Portal) => void
  setS: (p: string) => void
  setA: (p: string) => void
}) {
  const admin = portal === 'adminLogin',
    register = portal === 'register'
  const [registrationError, setRegistrationError] = useState('')
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (register) {
      const values = new FormData(e.currentTarget as HTMLFormElement)
      const fullName = String(values.get('fullName') ?? '').trim()
      const studentNumber = String(values.get('studentNumber') ?? '').trim()
      const email = String(values.get('email') ?? '')
        .trim()
        .toLowerCase()
      const contactNumber = String(values.get('contactNumber') ?? '').replace(/[\s-]/g, '')
      const password = String(values.get('password') ?? '')
      const confirmation = String(values.get('confirmPassword') ?? '')
      if (fullName.split(/\s+/).length < 2)
        return setRegistrationError('Enter your complete full name.')
      if (!/^\d{4}-\d{5}$/.test(studentNumber))
        return setRegistrationError('Student number must use the format 2023-12345.')
      if (!(/@gmail\.com$/.test(email) || /@bulsu\.edu\.ph$/.test(email)))
        return setRegistrationError('Use a Gmail address or your official BulSU email address.')
      if (!/^(?:\+63|0)9\d{9}$/.test(contactNumber))
        return setRegistrationError('Enter a valid Philippine mobile number.')
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/.test(password))
        return setRegistrationError(
          'Password must have 12+ characters, including uppercase, lowercase, and a number.',
        )
      if (password !== confirmation) return setRegistrationError('Passwords do not match.')
      setRegistrationError('')
      setSubmitting(true)
      try {
        const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fullName, studentNumber, email, contactNumber, password }) })
        const result = await response.json()
        if (!response.ok) return setRegistrationError(result.error || 'Registration failed.')
        setRegistrationSuccess(true)
      } catch { setRegistrationError('Cannot reach the server. Check that CampusFound is running.') }
      finally { setSubmitting(false) }
      return
    }
    const values = new FormData(e.currentTarget as HTMLFormElement)
    const email = String(values.get('email') ?? '').trim().toLowerCase()
    const password = String(values.get('password') ?? '')
    setSubmitting(true)
    setRegistrationError('')
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, portal: admin ? 'admin' : 'student' }) })
      const result = await response.json()
      if (!response.ok) return setRegistrationError(result.error || 'Sign in failed.')
      if (admin) { setA('dashboard'); setPortal('admin') }
      else { setS('dashboard'); setPortal('student') }
    } catch { setRegistrationError('Cannot reach the server. Check that CampusFound is running.') }
    finally { setSubmitting(false) }
  }
  if (registrationSuccess) {
    return (
      <main className="grid min-h-screen place-items-center bg-neutral-50 p-6">
        <section className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-black text-white">
            <Icon n="check" />
          </span>
          <p className="mt-5 text-xs font-bold uppercase tracking-[.14em] text-neutral-500">
            Registration successful
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Verify your email</h1>
          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Your CampusFound account has been created. You can now sign in using your registered email and password.
          </p>
          <button
            onClick={() => setPortal('studentLogin')}
            className="mt-6 h-11 rounded-lg bg-black px-5 text-sm font-semibold text-white"
          >
            Continue to student login
          </button>
        </section>
      </main>
    )
  }
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[.95fr_1.05fr]">
      <section className="flex min-h-[42vh] flex-col bg-black p-7 text-white lg:min-h-screen lg:p-12">
        <Logo admin={admin} />
        <div className="my-auto max-w-md py-14">
          <p className="text-xs font-bold uppercase tracking-[.15em] text-neutral-400">
            Bulacan State University
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-1.7px] lg:text-5xl">
            {admin
              ? 'Responsible administration starts here.'
              : 'Lost something? Let the campus help.'}
          </h1>
          <p className="mt-5 text-sm leading-6 text-neutral-400">
            {admin
              ? 'A focused workspace to review reports, verify claims, and keep the campus community connected.'
              : 'CampusFound makes it simple to report, discover, and safely recover your belongings.'}
          </p>
        </div>
        <p className="text-xs text-neutral-500">© 2026 Bulacan State University</p>
      </section>
      <section className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[430px]">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-neutral-500">
            {admin ? 'CampusFound Admin' : register ? 'Student account' : 'Student portal'}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-1px]">
            {admin ? 'Administrative access' : register ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            {admin
              ? 'Authorized personnel only.'
              : register
                ? 'Start reporting and tracking your campus items.'
                : 'Sign in to find or report a lost item.'}
          </p>
          <form
            onSubmit={submit}
            className={`mt-8 ${register ? 'grid gap-4 sm:grid-cols-2' : 'space-y-5'}`}
          >
            {register && (
              <>
                <Field label="Full name" name="fullName" placeholder="Juan Dela Cruz" />
                <Field label="Student number" name="studentNumber" placeholder="2023-11234" />
              </>
            )}
            <div className={register ? 'sm:col-span-2' : ''}>
              <Field
                label={
                  admin ? 'Admin or staff email' : register ? 'University email' : 'Student email'
                }
                type="email"
                name="email"
                placeholder="name@bulsu.edu.ph"
              />
            </div>
            {register && (
              <Field label="Contact number" name="contactNumber" placeholder="09XX XXX XXXX" />
            )}
            <Field
              label="Password"
              type="password"
              name="password"
              placeholder={register ? 'Create a password' : 'Enter your password'}
            />
            {register && (
              <div className="sm:col-span-2">
                <Field
                  label="Confirm password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat your password"
                />
              </div>
            )}
            {!admin && !register && (
              <div className="flex justify-between text-sm">
                <label className="flex items-center gap-2 text-neutral-600">
                  <input type="checkbox" className="accent-black" />
                  Remember me
                </label>
                <button type="button" className="font-semibold underline underline-offset-4">
                  Forgot password?
                </button>
              </div>
            )}
            {registrationError && (
              <p
                className="rounded-lg bg-neutral-100 px-3 py-2 text-sm text-neutral-800 sm:col-span-2"
                role="alert"
              >
                {registrationError}
              </p>
            )}
            <button
              disabled={submitting}
              className={`h-12 rounded-lg bg-black text-sm font-semibold text-white hover:bg-neutral-800 ${register ? 'sm:col-span-2' : 'w-full'}`}
            >
              {submitting ? 'Please wait...' : admin ? 'Sign in to dashboard' : register ? 'Create account' : 'Sign in'}
            </button>
          </form>
          {admin ? (
            <>
              <p className="mt-6 border-t border-neutral-200 pt-5 text-xs leading-5 text-neutral-500">
                This portal is restricted to authorized personnel. All actions are logged.
              </p>
              <button
                onClick={() => setPortal('studentLogin')}
                className="mt-4 text-sm font-semibold underline underline-offset-4"
              >
                Return to Student Portal
              </button>
            </>
          ) : (
            <p className="mt-7 text-center text-sm text-neutral-500">
              {register ? 'Already have an account?' : 'Don’t have an account?'}{' '}
              <button
                onClick={() => setPortal(register ? 'studentLogin' : 'register')}
                className="font-semibold text-black underline underline-offset-4"
              >
                {register ? 'Back to student login' : 'Create an account'}
              </button>
            </p>
          )}
          {!register && !admin && (
            <div className="mt-7 border-t border-neutral-200 pt-5 text-center">
              <button
                onClick={() => setPortal('adminLogin')}
                className="text-xs font-medium text-neutral-500"
              >
                Staff member? Access the Admin Portal
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
const studentNav = [
  ['dashboard', 'Dashboard', 'grid'],
  ['browse', 'Browse items', 'search'],
  ['report-lost', 'Report lost item', 'plus'],
  ['report-found', 'Report found item', 'plus'],
  ['reports', 'My reports', 'file'],
  ['claims', 'My claims', 'check'],
  ['notifications', 'Notifications', 'bell'],
  ['profile', 'Profile', 'user'],
]
const adminNav = [
  ['dashboard', 'Dashboard', 'grid'],
  ['item-reports', 'Item reports', 'file'],
  ['claim-requests', 'Claim requests', 'check'],
  ['manage-items', 'Manage items', 'box'],
  ['users', 'User management', 'users'],
  ['activity', 'Activity logs', 'clock'],
  ['notifications', 'Notifications', 'bell'],
  ['settings', 'Settings', 'settings'],
]
function Sidebar({
  admin,
  page,
  setPage,
  setPortal,
}: {
  admin: boolean
  page: string
  setPage: (x: string) => void
  setPortal: (x: Portal) => void
}) {
  const nav = admin ? adminNav : studentNav
  const exit = async () => { try { await fetch('/api/auth/logout', { method: 'POST' }) } finally { setPortal('studentLogin') } }
  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-[244px] shrink-0 flex-col border-r border-neutral-200 bg-white p-4 lg:flex">
        <Logo admin={admin} />
        <p className="mt-8 px-3 text-[10px] font-bold uppercase tracking-[.14em] text-neutral-400">
          {admin ? 'Administration' : 'Student workspace'}
        </p>
        <nav className="mt-3 space-y-1">
          {nav.map(([id, label, icon]) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium ${page === id ? 'bg-black text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'}`}
            >
              <Icon n={icon} />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto border-t border-neutral-200 pt-4">
          <div className="mb-3 flex items-center gap-2 px-3">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-neutral-200 text-xs font-bold">
              {admin ? 'AO' : 'JD'}
            </span>
            <span className="text-left">
              <b className="block text-xs">{admin ? 'Admin Office' : 'Juan Dela Cruz'}</b>
              <small className="text-[11px] text-neutral-500">
                {admin ? 'Administrator' : 'Student'}
              </small>
            </span>
          </div>
          <button
            onClick={exit}
            className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
          >
            <Icon n="logout" />
            Logout
          </button>
        </div>
      </aside>
      <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-5 lg:hidden">
        <Logo admin={admin} />
        <button
          onClick={exit}
          className="text-sm font-semibold underline underline-offset-4"
        >
          Exit
        </button>
      </header>
      <nav className="sticky bottom-0 z-30 flex overflow-auto border-t border-neutral-200 bg-white p-2 lg:hidden">
        {nav.slice(0, 5).map(([id, label, icon]) => (
          <button
            key={id}
            onClick={() => setPage(id)}
            className={`flex min-w-[74px] flex-1 flex-col items-center gap-1 py-1 text-[10px] ${page === id ? 'text-black' : 'text-neutral-400'}`}
          >
            <Icon n={icon} s={17} />
            {label.split(' ')[0]}
          </button>
        ))}
      </nav>
    </>
  )
}
function Title({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-400">
          CampusFound
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-[-1.2px]">{title}</h1>
        <p className="mt-2 text-sm text-neutral-500">{text}</p>
      </div>
      {action}
    </div>
  )
}
function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <p className="text-xs font-medium text-neutral-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-[-1px]">{value}</p>
      <p className="mt-2 text-xs text-neutral-400">{note}</p>
    </div>
  )
}
function Card({ item, open }: { item: Item; open: (x: Item) => void }) {
  return (
    <article className="overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative h-44">
        <ItemArt item={item} />
        <span className="absolute left-3 top-3">
          <Badge>{item.type}</Badge>
        </span>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-bold uppercase tracking-[.1em] text-neutral-400">
          {item.category}
        </p>
        <h3 className="mt-1 font-semibold">{item.name}</h3>
        <p className="mt-2 truncate text-xs text-neutral-500">{item.location}</p>
        <div className="mt-4 flex justify-between border-t border-neutral-100 pt-3">
          <span className="text-[11px] text-neutral-400">{item.date}</span>
          <button
            onClick={() => open(item)}
            className="text-xs font-bold underline underline-offset-4"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  )
}
function Head({
  children,
  action,
  onAction,
}: {
  children: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="mt-9 mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold">{children}</h2>
      {action && (
        <button onClick={onAction} className="text-sm font-semibold underline underline-offset-4">
          {action}
        </button>
      )}
    </div>
  )
}
function StudentDashboard({ go, open }: { go: (x: string) => void; open: (x: Item) => void }) {
  return (
    <>
      <Title
        title="Good morning, Juan."
        text="Here’s the latest from your CampusFound account."
        action={
          <button
            onClick={() => go('browse')}
            className="h-11 rounded-lg bg-black px-4 text-sm font-semibold text-white"
          >
            Browse all items
          </button>
        }
      />
      <div className="relative mt-8">
        <span className="absolute left-4 top-3.5 text-neutral-400">
          <Icon n="search" />
        </span>
        <input
          placeholder="Search for lost or found items..."
          className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-11 pr-4 text-sm outline-none focus:border-black"
        />
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <Stat label="My active reports" value="02" note="1 waiting for review" />
        <Stat label="Pending claims" value="01" note="Earbuds · submitted today" />
        <Stat label="Notifications" value="02" note="1 unread update" />
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <button
          onClick={() => go('report-lost')}
          className="rounded-xl bg-black p-6 text-left text-white"
        >
          <div className="flex justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10">
              <Icon n="search" />
            </span>
            <Icon n="arrow" />
          </div>
          <h2 className="mt-10 text-xl font-semibold">Report a lost item</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Let the campus know what you’re trying to find.
          </p>
        </button>
        <button
          onClick={() => go('report-found')}
          className="rounded-xl border border-neutral-200 bg-white p-6 text-left"
        >
          <div className="flex justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-neutral-100">
              <Icon n="plus" />
            </span>
            <Icon n="arrow" />
          </div>
          <h2 className="mt-10 text-xl font-semibold">Report a found item</h2>
          <p className="mt-1 text-sm text-neutral-500">Help return an item to our community.</p>
        </button>
      </div>
      <Head action="View all" onAction={() => go('browse')}>
        Recently added
      </Head>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.slice(0, 3).map((i) => (
          <Card key={i.id} item={i} open={open} />
        ))}
      </div>
      <Head>Lost items</Head>
      <div className="grid gap-4 sm:grid-cols-2">
        {items
          .filter((i) => i.type === 'Lost')
          .map((i) => (
            <Card key={i.id} item={i} open={open} />
          ))}
      </div>
    </>
  )
}
function Browse({ open }: { open: (x: Item) => void }) {
  const [liveItems, setLiveItems] = useState<Item[]>([])
  const [loadError, setLoadError] = useState('')
  useEffect(() => { fetch('/api/items').then(async r => { const data = await r.json(); if (!r.ok) throw new Error(data.error || 'Could not load items'); setLiveItems((data.items || []).map((x: any) => ({ ...x, type: x.type === 'found' ? 'Found' : 'Lost' }))) }).catch(e => setLoadError(e.message)) }, [])
  const [q, setQ] = useState(''),
    [type, setType] = useState('All'),
    [category, setCategory] = useState('All categories')
  const found = useMemo(
    () =>
      liveItems.filter(
        (i) =>
          (type === 'All' || i.type === type) &&
          (category === 'All categories' || i.category === category) &&
          `${i.name} ${i.location}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [q, type, category, liveItems],
  )
  return (
    <>
      <Title title="Browse items" text="Search reports submitted across the BulSU campus." />
      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_150px_170px_170px]">
          <label className="relative">
            <span className="absolute left-3 top-3 text-neutral-400">
              <Icon n="search" />
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search items or locations"
              className="h-11 w-full rounded-lg border border-neutral-300 pl-10 text-sm outline-none focus:border-black"
            />
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-11 rounded-lg border border-neutral-300 bg-white px-3 text-sm"
          >
            <option>All</option>
            <option>Lost</option>
            <option>Found</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 rounded-lg border border-neutral-300 bg-white px-3 text-sm"
          >
            <option>All categories</option>
            {[...new Set(liveItems.map((i) => i.category))].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <select className="h-11 rounded-lg border border-neutral-300 bg-white px-3 text-sm">
            <option>Recently added</option>
            <option>Oldest first</option>
          </select>
        </div>
      </div>
      {loadError && <p role="alert" className="mt-4 text-sm text-neutral-600">{loadError}</p>}
      <p className="mt-6 text-sm text-neutral-500">
        <b className="text-black">{found.length}</b> items found
      </p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {found.map((i) => (
          <Card key={i.id} item={i} open={open} />
        ))}
      </div>
      {!found.length && (
        <Empty title="No items found" text="Try adjusting your search or filters." />
      )}
    </>
  )
}
function Report({ type, go }: { type: 'Lost' | 'Found'; go: (x: string) => void }) {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  if (sent)
    return (
      <div className="mx-auto max-w-xl pt-16 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-black text-white">
          <Icon n="check" />
        </span>
        <h1 className="mt-5 text-3xl font-semibold">Report submitted</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Your {type.toLowerCase()} item report has been sent for review. We’ll notify you when its
          status changes.
        </p>
        <button
          onClick={() => go('reports')}
          className="mt-7 h-11 rounded-lg bg-black px-5 text-sm font-semibold text-white"
        >
          View my reports
        </button>
      </div>
    )
  return (
    <>
      <Title
        title={`Report a ${type.toLowerCase()} item`}
        text="Give enough detail to help staff and the community identify the item."
      />
      <div className="mt-7 max-w-3xl rounded-xl border border-neutral-200 bg-white p-5 text-sm text-neutral-600">
        <b className="text-black">Before you submit:</b> reports are reviewed by authorized
        personnel before appearing publicly.
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const form = e.currentTarget
          const values = new FormData(form)
          setSubmitting(true); setError('')
          try {
            const response = await fetch('/api/reports', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: values.get('title'), category: values.get('category'), description: values.get('description'), location: values.get('location'), eventDate: values.get('eventDate'), type: type.toLowerCase() }) })
            const result = await response.json()
            if (!response.ok) { setError(result.error || 'Could not submit report.'); return }
            setSent(true)
          } catch { setError('Cannot reach the server. Please try again.') }
          finally { setSubmitting(false) }
        }}
        className="mt-6 max-w-3xl space-y-5 rounded-xl border border-neutral-200 bg-white p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Item title" name="title" placeholder="e.g. Black wireless earbuds" />
          <label className="block text-sm font-medium">
            Item category
            <select
              required
              name="category"
              className="mt-1.5 h-12 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm font-normal"
            >
              <option value="">Select category</option>
              <option>Electronics</option>
              <option>Personal item</option>
              <option>School supply</option>
              <option>Clothing</option>
              <option>Keys</option>
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium">
          Description
          <textarea
            required
            name="description"
            placeholder="Color, brand, markings, and other details..."
            className="mt-1.5 h-28 w-full resize-none rounded-lg border border-neutral-300 p-3 text-sm font-normal outline-none focus:border-black"
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label={`Location ${type.toLowerCase()}`}
            name="location"
            placeholder="Building, room, or landmark"
          />
          <Field label={`Date ${type.toLowerCase()}`} type="date" placeholder="" />
        </div>
        <label className="grid cursor-pointer place-items-center rounded-lg border border-dashed border-neutral-300 px-6 py-8 text-center hover:border-black">
          <Icon n="upload" />
          <span className="mt-2 text-sm font-semibold">Upload an item image</span>
          <span className="mt-1 text-xs text-neutral-500">PNG, JPG, or WEBP · max 10MB</span>
          <input type="file" className="sr-only" />
        </label>
        {error && <p role="alert" className="rounded-lg bg-neutral-100 px-3 py-2 text-sm">{error}</p>}
        <div className="flex gap-3 border-t border-neutral-100 pt-5">
          <button
            type="button"
            onClick={() => go('dashboard')}
            className="h-11 rounded-lg border border-neutral-300 px-5 text-sm font-semibold"
          >
            Cancel
          </button>
          <button disabled={submitting} className="h-11 rounded-lg bg-black px-5 text-sm font-semibold text-white disabled:opacity-60">
            {submitting ? 'Submitting...' : 'Submit report'}
          </button>
        </div>
      </form>
    </>
  )
}
function Empty({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-5 rounded-xl border border-dashed border-neutral-300 bg-white py-14 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-neutral-500">{text}</p>
    </div>
  )
}
function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-neutral-50 text-[11px] font-bold uppercase tracking-[.08em] text-neutral-500">
          <tr>
            {headers.map((x) => (
              <th key={x} className="px-5 py-3.5">
                {x}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {rows.map((r, i) => (
            <tr key={i} className="text-neutral-600">
              {r.map((x, j) => (
                <td key={j} className="whitespace-nowrap px-5 py-4">
                  {x}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
function StudentLists({ page, open }: { page: string; open: (x: Item) => void }) {
  const claims = page === 'claims'
  return (
    <>
      <Title
        title={claims ? 'My claims' : 'My reports'}
        text={
          claims
            ? 'See the review status of your ownership claims.'
            : 'Keep track of each item report you have submitted.'
        }
      />
      <div className="mt-7">
        <Table
          headers={
            claims
              ? ['Item', 'Date claimed', 'Status', 'Ownership details', 'Admin remarks']
              : ['Item', 'Report type', 'Submitted', 'Review status', 'Admin remarks', 'Action']
          }
          rows={
            claims
              ? [
                  [
                    items[0].name,
                    'Oct 14, 2026',
                    <Badge>Pending</Badge>,
                    'White mark on right earbud',
                    'Under review',
                  ],
                  [
                    'Silver Key Ring',
                    'Oct 12, 2026',
                    <Badge>Approved</Badge>,
                    'Three keys, BSU keychain',
                    'Ready for pickup',
                  ],
                ]
              : items.slice(0, 3).map((i, n) => [
                  <button
                    onClick={() => open(i)}
                    className="font-semibold underline underline-offset-4"
                  >
                    {i.name}
                  </button>,
                  i.type,
                  i.date,
                  <Badge>{n === 1 ? 'Approved' : n === 2 ? 'Rejected' : 'Pending'}</Badge>,
                  n === 2
                    ? 'Please add more details.'
                    : n === 1
                      ? 'Published to directory.'
                      : 'Awaiting review',
                  <button
                    onClick={() => open(i)}
                    className="font-semibold underline underline-offset-4"
                  >
                    View
                  </button>,
                ])
          }
        />
      </div>
    </>
  )
}
function Notifications() {
  return (
    <>
      <Title title="Notifications" text="Updates about your reports, claims, and item activity." />
      <div className="mt-7 divide-y divide-neutral-100 overflow-hidden rounded-xl border border-neutral-200 bg-white">
        {[
          [
            'Claim request received',
            'Your claim for Black Wireless Earbuds is now under review.',
            '10 minutes ago',
            true,
          ],
          [
            'Report approved',
            'Your Blue Hydro Flask report is visible in the directory.',
            'Yesterday',
            true,
          ],
          [
            'Item returned',
            'Silver Key Ring was marked as returned to its owner.',
            'Oct 12, 2026',
            false,
          ],
        ].map(([a, b, c, d]) => (
          <div key={a as string} className={`flex gap-4 p-5 ${d ? 'bg-neutral-50' : ''}`}>
            <span className={`mt-1 h-2 w-2 rounded-full ${d ? 'bg-black' : 'bg-neutral-200'}`} />
            <div className="flex-1">
              <p className="text-sm font-semibold">{a}</p>
              <p className="mt-1 text-sm text-neutral-500">{b}</p>
            </div>
            <span className="text-xs text-neutral-400">{c}</span>
          </div>
        ))}
      </div>
    </>
  )
}
function Profile({ setPortal }: { setPortal: (x: Portal) => void }) {
  return (
    <>
      <Title title="My profile" text="Manage your personal and account details." />
      <div className="mt-7 max-w-3xl rounded-xl border border-neutral-200 bg-white">
        <div className="flex items-center gap-4 border-b border-neutral-100 p-6">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-neutral-100 text-lg font-bold">
            JD
          </span>
          <div>
            <h2 className="font-semibold">Juan Dela Cruz</h2>
            <p className="mt-1 text-sm text-neutral-500">Student account · Active</p>
          </div>
        </div>
        <dl className="grid gap-5 p-6 sm:grid-cols-2">
          {[
            ['Full name', 'Juan Dela Cruz'],
            ['Student number', '2023-11234'],
            ['University email', 'juan.delacruz@bulsu.edu.ph'],
            ['Contact number', '0917 123 4567'],
            ['Account created', 'October 02, 2026'],
            ['Account role', 'Student'],
          ].map(([a, b]) => (
            <div key={a}>
              <dt className="text-xs font-bold uppercase tracking-[.08em] text-neutral-400">{a}</dt>
              <dd className="mt-1 text-sm font-medium">{b}</dd>
            </div>
          ))}
        </dl>
        <div className="border-t border-neutral-100 p-6">
          <button
            onClick={() => setPortal('studentLogin')}
            className="h-10 rounded-lg border border-neutral-300 px-4 text-sm font-semibold"
          >
            Log out of CampusFound
          </button>
        </div>
      </div>
    </>
  )
}
function AdminDashboard({ go }: { go: (x: string) => void }) {
  return (
    <>
      <Title
        title="Good morning, Admin Office."
        text="Here is the current CampusFound review queue."
        action={
          <button
            onClick={() => go('item-reports')}
            className="h-11 rounded-lg bg-black px-4 text-sm font-semibold text-white"
          >
            Review pending reports
          </button>
        }
      />
      <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <Stat label="Total items" value="142" note="All item records" />
        <Stat label="Lost items" value="58" note="41% of total" />
        <Stat label="Found items" value="84" note="59% of total" />
        <Stat label="Pending reports" value="12" note="Require review" />
        <Stat label="Pending claims" value="08" note="Require verification" />
        <Stat label="Returned items" value="39" note="This semester" />
      </div>
      <div className="mt-8 grid gap-5 xl:grid-cols-[1.4fr_.8fr]">
        <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex justify-between">
            <h2 className="font-semibold">Recent item reports</h2>
            <button
              onClick={() => go('item-reports')}
              className="text-xs font-bold underline underline-offset-4"
            >
              View all
            </button>
          </div>
          <div className="mt-4">
            <Table
              headers={['Item', 'Type', 'Reporter', 'Status']}
              rows={items
                .slice(0, 3)
                .map((i, n) => [
                  i.name,
                  i.type,
                  i.reporter,
                  <Badge>{n === 0 ? 'Pending' : 'Approved'}</Badge>,
                ])}
            />
          </div>
        </section>
        <section className="rounded-xl border border-neutral-200 bg-white p-5">
          <h2 className="font-semibold">Pending approvals</h2>
          {['Black Wireless Earbuds', 'Calculus II Notebook', 'Claim · Silver Key Ring'].map(
            (x, n) => (
              <div key={x} className="border-b border-neutral-100 py-4 last:border-0">
                <p className="text-sm font-semibold">{x}</p>
                <p className="mt-1 text-xs text-neutral-500">
                  {n === 2 ? 'Ownership review' : 'Item report'} · pending
                </p>
                <button
                  onClick={() => go(n === 2 ? 'claim-review' : 'item-review')}
                  className="mt-3 text-xs font-bold underline underline-offset-4"
                >
                  Review request
                </button>
              </div>
            ),
          )}
        </section>
      </div>
    </>
  )
}
function AdminTable({
  page,
  go,
  ask,
}: {
  page: string
  go: (x: string) => void
  ask: (x: string) => void
}) {
  if (page === 'users')
    return (
      <>
        <Title title="User management" text="CampusFound user accounts and authorization roles." />
        <div className="mt-7">
          <Table
            headers={['User ID', 'Full name', 'Email', 'Student number', 'Role', 'Registered']}
            rows={[
              [
                'USR-2084',
                'Juan Dela Cruz',
                'juan.delacruz@bulsu.edu.ph',
                '2023-11234',
                <Badge>Student</Badge>,
                'Oct 14, 2026',
              ],
              [
                'STF-0014',
                'Leah Ramos',
                'leah.ramos@bulsu.edu.ph',
                '—',
                <Badge>Staff</Badge>,
                'Sep 03, 2026',
              ],
              [
                'ADM-0001',
                'Admin Office',
                'admin@bulsu.edu.ph',
                '—',
                <Badge>Admin</Badge>,
                'Aug 02, 2026',
              ],
            ]}
          />
        </div>
      </>
    )
  if (page === 'activity')
    return (
      <>
        <Title
          title="Activity logs"
          text="A chronological record of account and administrative actions."
        />
        <div className="mt-7">
          <Table
            headers={['Date & time', 'Performed by', 'Action', 'Details']}
            rows={[
              ['Oct 14 · 10:42 AM', 'Leah Ramos', 'Approved report', 'CF-1042 · Wireless Earbuds'],
              ['Oct 14 · 09:18 AM', 'Admin Office', 'Approved claim', 'CLM-5018 · Key Ring'],
              [
                'Oct 13 · 03:26 PM',
                'Leah Ramos',
                'Rejected report',
                'CF-1038 · Incomplete description',
              ],
            ]}
          />
        </div>
      </>
    )
  const claims = page === 'claim-requests'
  return (
    <>
      <Title
        title={
          claims ? 'Claim requests' : page === 'manage-items' ? 'Manage items' : 'Item reports'
        }
        text={
          claims
            ? 'Verify ownership details before releasing an item.'
            : page === 'manage-items'
              ? 'Search and manage all published and archived records.'
              : 'Review incoming reports before publishing.'
        }
      />
      {page === 'manage-items' && (
        <input
          placeholder="Search by item ID, name, reporter..."
          className="mt-7 h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-black"
        />
      )}
      <div className="mt-7">
        <Table
          headers={
            claims
              ? ['Claim ID', 'Item', 'Claimant', 'Contact', 'Submitted', 'Status', 'Actions']
              : [
                  'Item ID',
                  'Item',
                  'Type',
                  'Category',
                  'Reporter',
                  'Submitted',
                  'Status',
                  'Actions',
                ]
          }
          rows={
            claims
              ? [
                  [
                    'CLM-5018',
                    items[0].name,
                    'Juan Dela Cruz',
                    '0917 123 4567',
                    'Today',
                    <Badge>Pending</Badge>,
                    <button
                      onClick={() => go('claim-review')}
                      className="font-semibold underline underline-offset-4"
                    >
                      Review
                    </button>,
                  ],
                  [
                    'CLM-5011',
                    'Silver Key Ring',
                    'Ana Santos',
                    '0918 940 5561',
                    'Oct 12',
                    <Badge>Approved</Badge>,
                    <button
                      onClick={() => ask('Mark item as returned')}
                      className="font-semibold underline underline-offset-4"
                    >
                      Return item
                    </button>,
                  ],
                ]
              : items.map((i, n) => [
                  i.id,
                  i.name,
                  i.type,
                  i.category,
                  i.reporter,
                  i.date,
                  <Badge>{n < 2 ? 'Pending' : 'Approved'}</Badge>,
                  <button
                    onClick={() => go('item-review')}
                    className="font-semibold underline underline-offset-4"
                  >
                    Review
                  </button>,
                ])
          }
        />
      </div>
    </>
  )
}
function Review({
  claim,
  go,
  ask,
}: {
  claim: boolean
  go: (x: string) => void
  ask: (x: string) => void
}) {
  const item = items[0]
  return (
    <>
      <button
        onClick={() => go(claim ? 'claim-requests' : 'item-reports')}
        className="flex items-center gap-2 text-sm font-semibold text-neutral-600"
      >
        <span className="rotate-180">
          <Icon n="arrow" s={16} />
        </span>
        Back to list
      </button>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <section>
          <Title
            title={item.name}
            text={
              claim
                ? 'Claim submitted by Juan Dela Cruz · Today, 10:30 AM'
                : 'Found report by Miguel Santos · Today, 10:24 AM'
            }
          />
          <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
            <div className="h-64">
              <ItemArt item={item} />
            </div>
            <dl className="grid gap-5 p-6 sm:grid-cols-2">
              {(claim
                ? [
                    ['Claimant', 'Juan Dela Cruz'],
                    ['Contact', '0917 123 4567'],
                    ['Ownership detail', 'Small white mark on the right earbud.'],
                    ['Submitted', 'Oct 14, 2026 · 10:30 AM'],
                  ]
                : [
                    ['Category', item.category],
                    ['Location', item.location],
                    ['Date found', item.date],
                    [
                      'Description',
                      'Compact black earbuds case with a small scratch near the charging port.',
                    ],
                  ]
              ).map(([a, b]) => (
                <div key={a}>
                  <dt className="text-xs font-bold uppercase tracking-[.08em] text-neutral-400">
                    {a}
                  </dt>
                  <dd className="mt-1 text-sm leading-5">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <aside className="self-end rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-[.1em] text-neutral-400">Decision</p>
          <h2 className="mt-2 text-lg font-semibold">
            {claim ? 'Verify this claim' : 'Review this report'}
          </h2>
          <p className="mt-2 text-sm leading-6 text-neutral-500">
            {claim
              ? 'Confirm the ownership information is sufficient before approving.'
              : 'Confirm the report has enough information and follows campus guidelines.'}
          </p>
          <label className="mt-5 block text-sm font-semibold">
            Admin remarks
            <textarea
              className="mt-2 h-28 w-full resize-none rounded-lg border border-neutral-300 p-3 text-sm font-normal outline-none focus:border-black"
              placeholder="Add a note for the student..."
            />
          </label>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => ask(claim ? 'Approve this claim' : 'Approve this report')}
              className="h-11 rounded-lg bg-black px-4 text-sm font-semibold text-white"
            >
              Approve
            </button>
            <button
              onClick={() => ask(claim ? 'Reject this claim' : 'Reject this report')}
              className="h-11 rounded-lg border border-neutral-300 px-4 text-sm font-semibold"
            >
              Reject
            </button>
            {claim && (
              <button
                onClick={() => ask('Mark item as returned')}
                className="h-11 rounded-lg border border-neutral-300 px-4 text-sm font-semibold"
              >
                Mark returned
              </button>
            )}
          </div>
        </aside>
      </div>
    </>
  )
}
function Settings() {
  return (
    <>
      <Title title="Settings" text="Configure account and system preferences." />
      <div className="mt-7 max-w-3xl divide-y divide-neutral-100 rounded-xl border border-neutral-200 bg-white">
        {[
          [
            'Campus notification emails',
            'Send status updates to student university email addresses.',
          ],
          [
            'Require image on reports',
            'Require students to attach a supporting image before submitting.',
          ],
          [
            'Automatic report archiving',
            'Archive closed reports 90 days after an item is returned.',
          ],
        ].map(([a, b]) => (
          <div key={a} className="flex items-center justify-between gap-5 p-5">
            <div>
              <p className="text-sm font-semibold">{a}</p>
              <p className="mt-1 text-sm text-neutral-500">{b}</p>
            </div>
            <button
              aria-label={`Toggle ${a}`}
              className="relative h-6 w-11 shrink-0 rounded-full bg-black after:absolute after:right-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white"
            />
          </div>
        ))}
      </div>
    </>
  )
}
function Modal({
  item,
  close,
  go,
}: {
  item: Item | null
  close: () => void
  go: (x: string) => void
}) {
  const [claim, setClaim] = useState(false),
    [done, setDone] = useState(false)
  if (!item) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="relative h-56">
          <ItemArt item={item} />
          <button
            onClick={close}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white shadow"
          >
            <Icon n="close" />
          </button>
        </div>
        {done ? (
          <div className="p-8 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-black text-white">
              <Icon n="check" />
            </span>
            <h2 className="mt-4 text-2xl font-semibold">Claim submitted</h2>
            <p className="mt-2 text-sm text-neutral-500">
              Your ownership details have been sent for staff verification.
            </p>
            <button
              onClick={() => {
                close()
                go('claims')
              }}
              className="mt-6 h-11 rounded-lg bg-black px-5 text-sm font-semibold text-white"
            >
              View my claims
            </button>
          </div>
        ) : (
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-neutral-400">
              {item.id} · {item.type}
            </p>
            <h2 className="mt-1 text-2xl font-semibold">{item.name}</h2>
            <p className="mt-4 text-sm leading-6 text-neutral-600">
              A detailed report is available to help identify this item. Location: {item.location}.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 border-y border-neutral-100 py-5 text-sm">
              <div>
                <small className="block text-neutral-400">Category</small>
                {item.category}
              </div>
              <div>
                <small className="block text-neutral-400">Location</small>
                {item.location}
              </div>
              <div>
                <small className="block text-neutral-400">Reported</small>
                {item.date}
              </div>
            </div>
            {claim && (
              <label className="mt-5 block text-sm font-semibold">
                How can you verify this item is yours?
                <textarea
                  className="mt-2 h-24 w-full resize-none rounded-lg border border-neutral-300 p-3 text-sm font-normal"
                  placeholder="Share a detail only the owner would know..."
                />
              </label>
            )}
            <div className="mt-6 flex gap-3">
              <button
                onClick={close}
                className="h-11 rounded-lg border border-neutral-300 px-4 text-sm font-semibold"
              >
                Close
              </button>
              {item.type === 'Found' && (
                <button
                  onClick={() => (claim ? setDone(true) : setClaim(true))}
                  className="h-11 rounded-lg bg-black px-4 text-sm font-semibold text-white"
                >
                  Submit claim
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
function App() {
  const [portal, setPortal] = useState<Portal>('studentLogin'),
    [sp, setSp] = useState('dashboard'),
    [ap, setAp] = useState('dashboard'),
    [item, setItem] = useState<Item | null>(null),
    [confirm, setConfirm] = useState('')
  if (['studentLogin', 'register', 'adminLogin'].includes(portal))
    return <Auth portal={portal} setPortal={setPortal} setS={setSp} setA={setAp} />
  const admin = portal === 'admin',
    page = admin ? ap : sp,
    go = admin ? setAp : setSp
  let content: ReactNode
  if (admin) {
    if (page === 'dashboard') content = <AdminDashboard go={setAp} />
    else if (page === 'item-review' || page === 'claim-review')
      content = <Review claim={page === 'claim-review'} go={setAp} ask={setConfirm} />
    else if (page === 'settings') content = <Settings />
    else if (page === 'notifications') content = <Notifications />
    else content = <AdminTable page={page} go={setAp} ask={setConfirm} />
  } else {
    if (page === 'dashboard') content = <StudentDashboard go={setSp} open={setItem} />
    else if (page === 'browse') content = <Browse open={setItem} />
    else if (page === 'report-lost' || page === 'report-found')
      content = <Report type={page === 'report-lost' ? 'Lost' : 'Found'} go={setSp} />
    else if (page === 'reports' || page === 'claims')
      content = <StudentLists page={page} open={setItem} />
    else if (page === 'notifications') content = <Notifications />
    else content = <Profile setPortal={setPortal} />
  }
  return (
    <main className="min-h-screen bg-[#fafafa] text-neutral-950">
      <div className="flex">
        <Sidebar admin={admin} page={page} setPage={go} setPortal={setPortal} />
        <div className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1450px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {content}
          </div>
        </div>
      </div>
      <Modal item={item} close={() => setItem(null)} go={setSp} />
      {confirm && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/45 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">{confirm}?</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
              This will update the request status and notify the student. This action cannot be
              undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirm('')}
                className="h-10 rounded-lg border border-neutral-300 px-4 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setConfirm('')
                  setAp('dashboard')
                }}
                className="h-10 rounded-lg bg-black px-4 text-sm font-semibold text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
export default App
