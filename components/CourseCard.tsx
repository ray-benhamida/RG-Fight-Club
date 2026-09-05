'use client'

import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import { formatTimeRange } from '@/lib/planning'
import type { PlanningCourse } from '@/lib/planning'
import { getSessionTypeColorClasses, type SessionTypeColor } from '@/lib/sessionTypeColors'

interface CourseCardProps {
	course: PlanningCourse
	onSelect: (course: PlanningCourse) => void
}

export default function CourseCard({ course, onSelect }: CourseCardProps) {
	const colorClasses = getSessionTypeColorClasses(course.sessionType.couleur as SessionTypeColor)

	return (
		<button
			type="button"
			onClick={() => onSelect(course)}
			className="group relative w-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-sm transition-shadow hover:shadow-md"
		>
			<div className="flex">
				<div className={`relative w-2 shrink-0 ${colorClasses.accent}`}>
					<div
						className={`absolute -right-1.5 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[5px] border-l-[6px] border-y-transparent ${colorClasses.accentBorder}`}
						aria-hidden
					/>
				</div>
				<div className="min-w-0 flex-1 px-4 py-3">
					<h3
						className={`font-page-header-title text-lg font-extrabold uppercase leading-tight tracking-tight ${colorClasses.text}`}
					>
						{course.titre}
					</h3>
					{course.sousTitre ? (
						<p className={`mt-0.5 text-sm font-semibold tracking-tight italic ${colorClasses.text}`}>
							{course.sousTitre}
						</p>
					) : null}
					<div className="mt-2 flex items-center gap-1.5 text-xs text-gray-600">
						<FaClock className="h-3 w-3 shrink-0" aria-hidden />
						<span>{formatTimeRange(course.heureDebut, course.heureFin)}</span>
					</div>
					<div className="mt-1 flex items-center gap-1.5 text-xs text-gray-600">
						<FaMapMarkerAlt className="h-3 w-3 shrink-0" aria-hidden />
						<span>{course.room.label}</span>
					</div>
				</div>
			</div>
		</button>
	)
}
