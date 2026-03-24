import type { ReactNode } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth/useAuth'

const Shell = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.background} 92%,
    transparent
  );
  backdrop-filter: blur(10px);
`

const HeaderInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
`

const Brand = styled(Link)`
  font-weight: 700;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
`

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`

const NavItemInner = styled.span<{ $active: boolean }>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.radii.full};
  font-weight: 500;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textMuted};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.surface : 'transparent'};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

const UserMeta = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.space.xl} ${theme.space.lg} ${theme.space.xxl}`};
`

function NavItem({
  to,
  end,
  children,
}: {
  to: string
  end?: boolean
  children: ReactNode
}) {
  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => <NavItemInner $active={isActive}>{children}</NavItemInner>}
    </NavLink>
  )
}

export function RootLayout() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <Shell>
      <Header>
        <HeaderInner>
          <Brand to="/">Student Blogging</Brand>
          <Nav aria-label="Principal">
            <NavItem to="/" end>
              Posts
            </NavItem>
            {isAuthenticated ? (
              <>
                <NavItem to="/admin">Admin</NavItem>
                <NavItem to="/posts/novo">Novo post</NavItem>
              </>
            ) : null}
            <NavItem to="/login">{isAuthenticated ? 'Conta' : 'Entrar'}</NavItem>
          </Nav>
          {isAuthenticated && user ? (
            <UserMeta>
              {user.name} ·{' '}
              <Button type="button" $variant="ghost" onClick={() => void logout()}>
                Sair
              </Button>
            </UserMeta>
          ) : null}
        </HeaderInner>
      </Header>
      <Main id="main-content">
        <Outlet />
      </Main>
    </Shell>
  )
}
