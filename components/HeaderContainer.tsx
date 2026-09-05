import Header from '@/components/Header'
import { getHeaderNav } from '@/lib/header'

interface HeaderContainerProps {
	variant?: 'home' | 'solid'
}

export default async function HeaderContainer({ variant = 'home' }: HeaderContainerProps) {
	const nav = await getHeaderNav()

	return <Header variant={variant} navLinks={nav.navLinks} instagram={nav.instagram} />
}
