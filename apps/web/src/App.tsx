import { Route, Routes } from 'react-router-dom'
import { ProfilePage } from 'src/modules/auth/pages/ProfilePage'
import { SignInPage } from 'src/modules/auth/pages/SignInPage'
import { SignUpPage } from 'src/modules/auth/pages/SignUpPage'
import { CreateEventPage } from 'src/modules/events/pages/CreateEventPage'
import { DashboardPage } from 'src/modules/events/pages/DashboardPage'
import { EventDetailPage } from 'src/modules/events/pages/EventDetailPage'
import { EventEditPage } from 'src/modules/events/pages/EventEditPage'

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
