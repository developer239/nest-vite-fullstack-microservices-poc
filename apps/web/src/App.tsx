import { Route, Routes } from 'react-router-dom'
import { ProfilePage } from './modules/auth/pages/ProfilePage'
import { SignInPage } from './modules/auth/pages/SignInPage'
import { SignUpPage } from './modules/auth/pages/SignUpPage'
import { CreateEventPage } from './modules/events/pages/CreateEventPage'
import { DashboardPage } from './modules/events/pages/DashboardPage'
import { EventDetailPage } from './modules/events/pages/EventDetailPage'
import { EventEditPage } from './modules/events/pages/EventEditPage'

export const App = () => (
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/event/create" element={<CreateEventPage />} />
    <Route path="/event/:id" element={<EventDetailPage />} />
    <Route path="/event/:id/edit" element={<EventEditPage />} />
  </Routes>
)
