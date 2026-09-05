import PlanningBoard from '@/components/PlanningBoard'
import type { GlobalSettingsData } from '@/lib/globalSettings'
import {
	parseTimeToMinutes,
	WEEKDAY_ORDER,
	type PlanningCourse,
	type WeekdayValue,
} from '@/lib/planning'
import type { SessionTypeColor } from '@/lib/sessionTypeColors'
import { getPayloadClient } from '@/lib/payload'
import type { Course, Room, SessionType } from '@/payload-types'

interface PlanningProps {
	globalSettings: GlobalSettingsData
	sectionClassName?: string
}

function resolveSessionType(type: string | SessionType | null | undefined) {
	if (!type || typeof type === 'string') return null

	return {
		id: type.id,
		label: type.label,
		couleur: type.couleur as SessionTypeColor,
	}
}

function resolveRoom(room: string | Room | null | undefined) {
	if (!room || typeof room === 'string') return null

	return {
		nom: room.nom,
		label: room.label,
		adresse: room.adresse,
		mapsUrl: room.mapsUrl,
	}
}

function mapCourse(doc: Course): PlanningCourse | null {
	const sessionType = resolveSessionType(doc.type)
	const room = resolveRoom(doc.salle)

	if (!sessionType || !room) return null

	return {
		id: doc.id,
		titre: doc.titre,
		sousTitre: doc.sousTitre,
		description: doc.description,
		heureDebut: doc.heureDebut,
		heureFin: doc.heureFin,
		jour: doc.jour as WeekdayValue,
		sessionType,
		room,
	}
}

function sortCourses(a: PlanningCourse, b: PlanningCourse): number {
	const dayDiff = WEEKDAY_ORDER.indexOf(a.jour) - WEEKDAY_ORDER.indexOf(b.jour)
	if (dayDiff !== 0) return dayDiff

	return parseTimeToMinutes(a.heureDebut) - parseTimeToMinutes(b.heureDebut)
}

export default async function Planning({
	globalSettings,
	sectionClassName = 'bg-white py-12',
}: PlanningProps) {
	const payload = await getPayloadClient()
	const { docs } = await payload.find({
		collection: 'courses',
		where: {
			actif: {
				equals: true,
			},
		},
		sort: 'heureDebut',
		limit: 100,
		depth: 1,
	})

	const courses = docs
		.map(mapCourse)
		.filter((course): course is PlanningCourse => course !== null)
		.sort(sortCourses)

	return (
		<section className={sectionClassName}>
			<div className="container mx-auto px-8">
				<PlanningBoard courses={courses} globalSettings={globalSettings} />
			</div>
		</section>
	)
}
