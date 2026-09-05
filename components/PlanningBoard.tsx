'use client'

import { useMemo, useState } from 'react'
import { FaBook, FaClock, FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa'
import Button from '@/components/Button'
import CourseCard from '@/components/CourseCard'
import Drawer from '@/components/Drawer'
import type { GlobalSettingsData } from '@/lib/globalSettings'
import {
	formatTimeRange,
	getTodayWeekday,
	getWeekdayLabel,
	getWeekdayShortLabel,
	WEEKDAYS,
	type PlanningCourse,
	type PlanningSessionTypeFilter,
	type WeekdayValue,
} from '@/lib/planning'
import { getSessionTypeColorClasses } from '@/lib/sessionTypeColors'

interface PlanningBoardProps {
	courses: PlanningCourse[]
	globalSettings: GlobalSettingsData
}

const BASE_WEEKDAYS: WeekdayValue[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']

interface DayCoursesProps {
	dayValue: WeekdayValue
	dayCourses: PlanningCourse[]
	onSelectCourse: (course: PlanningCourse) => void
	showDayHeader?: boolean
}

function DayCourses({ dayValue, dayCourses, onSelectCourse, showDayHeader = true }: DayCoursesProps) {
	const dayLabel = getWeekdayLabel(dayValue)

	return (
		<div>
			{showDayHeader ? (
				<div className="mb-4 text-center">
					<h3 className="font-page-header-title text-2xl font-extrabold uppercase italic tracking-tight text-darkgray">
						{dayLabel}
					</h3>
					<div className="mx-auto mt-2 h-0.5 w-8 bg-primary" />
				</div>
			) : null}
			<div className="flex flex-col gap-3">
				{dayCourses.length === 0 ? (
					<div className="rounded-lg border border-dashed border-gray-200 px-3 py-6 text-center text-xs text-gray-400">
						Aucun cours
					</div>
				) : (
					dayCourses.map((course) => (
						<CourseCard key={course.id} course={course} onSelect={onSelectCourse} />
					))
				)}
			</div>
		</div>
	)
}

export default function PlanningBoard({ courses, globalSettings }: PlanningBoardProps) {
	const [selectedTypeId, setSelectedTypeId] = useState<string | 'all'>('all')
	const [selectedDay, setSelectedDay] = useState<WeekdayValue>(getTodayWeekday)
	const [selectedCourse, setSelectedCourse] = useState<PlanningCourse | null>(null)

	const sessionTypes = useMemo<PlanningSessionTypeFilter[]>(() => {
		const map = new Map<string, PlanningSessionTypeFilter>()

		for (const course of courses) {
			if (!map.has(course.sessionType.id)) {
				map.set(course.sessionType.id, course.sessionType)
			}
		}

		return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label, 'fr'))
	}, [courses])

	const visibleWeekdays = useMemo(() => {
		const weekdaysWithCourses = new Set(courses.map((course) => course.jour))
		const extraDays = WEEKDAYS.filter(
			(day) => !BASE_WEEKDAYS.includes(day.value) && weekdaysWithCourses.has(day.value),
		).map((day) => day.value)

		return [...BASE_WEEKDAYS, ...extraDays]
	}, [courses])

	const activeDay = visibleWeekdays.includes(selectedDay)
		? selectedDay
		: (visibleWeekdays[0] ?? 'lundi')

	const filteredCourses = useMemo(() => {
		if (selectedTypeId === 'all') return courses
		return courses.filter((course) => course.sessionType.id === selectedTypeId)
	}, [courses, selectedTypeId])

	const coursesByDay = useMemo(() => {
		const grouped = new Map<WeekdayValue, PlanningCourse[]>()

		for (const day of visibleWeekdays) {
			grouped.set(day, [])
		}

		for (const course of filteredCourses) {
			const dayCourses = grouped.get(course.jour)
			if (dayCourses) {
				dayCourses.push(course)
			}
		}

		return grouped
	}, [filteredCourses, visibleWeekdays])

	const coursesCta = globalSettings.courses.url
		? { label: globalSettings.courses.label, href: globalSettings.courses.url }
		: null
	const registrationCta = globalSettings.registration.url
		? { label: globalSettings.registration.label, href: globalSettings.registration.url }
		: null

	const selectedColorClasses = selectedCourse
		? getSessionTypeColorClasses(selectedCourse.sessionType.couleur)
		: null

	return (
		<>
			<div className="mb-8 flex flex-wrap gap-3">
				<button
					type="button"
					onClick={() => setSelectedTypeId('all')}
					className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
						selectedTypeId === 'all'
							? 'bg-primary text-white'
							: 'border border-gray-200 bg-white text-darkgray hover:border-primary/40'
					}`}
				>
					Tous les cours
				</button>
				{sessionTypes.map((sessionType) => {
					const colorClasses = getSessionTypeColorClasses(sessionType.couleur)
					const isActive = selectedTypeId === sessionType.id

					return (
						<button
							key={sessionType.id}
							type="button"
							onClick={() => setSelectedTypeId(sessionType.id)}
							className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
								isActive
									? 'bg-primary text-white'
									: 'border border-gray-200 bg-white text-darkgray hover:border-primary/40'
							}`}
						>
							<span
								className={`h-2.5 w-2.5 shrink-0 rounded-full ${isActive ? 'bg-white' : colorClasses.dot}`}
								aria-hidden
							/>
							<span>{sessionType.label}</span>
						</button>
					)
				})}
			</div>

			{courses.length === 0 ? (
				<p className="text-center text-lg text-gray-600">
					Aucun cours pour le moment. Revenez bientôt !
				</p>
			) : (
				<>
					<div
						className="mb-6 flex gap-2 overflow-x-auto pb-1 md:hidden"
						role="tablist"
						aria-label="Jours de la semaine"
					>
						{visibleWeekdays.map((dayValue) => {
							const isActive = activeDay === dayValue
							const dayCourseCount = coursesByDay.get(dayValue)?.length ?? 0

							return (
								<button
									key={dayValue}
									type="button"
									role="tab"
									aria-selected={isActive}
									onClick={() => setSelectedDay(dayValue)}
									className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-bold transition-colors ${
										isActive
											? 'bg-primary text-white'
											: 'border border-gray-200 bg-white text-darkgray hover:border-primary/40'
									}`}
								>
									{getWeekdayShortLabel(dayValue)}
									{dayCourseCount > 0 ? (
										<span className="ml-1.5 text-xs opacity-80">({dayCourseCount})</span>
									) : null}
								</button>
							)
						})}
					</div>

					<div className="md:hidden">
						<DayCourses
							dayValue={activeDay}
							dayCourses={coursesByDay.get(activeDay) ?? []}
							onSelectCourse={setSelectedCourse}
							showDayHeader={false}
						/>
					</div>

					<div
						className="hidden gap-4 md:grid"
						style={{ gridTemplateColumns: `repeat(${visibleWeekdays.length}, minmax(0, 1fr))` }}
					>
						{visibleWeekdays.map((dayValue) => (
							<DayCourses
								key={dayValue}
								dayValue={dayValue}
								dayCourses={coursesByDay.get(dayValue) ?? []}
								onSelectCourse={setSelectedCourse}
							/>
						))}
					</div>
				</>
			)}

			<Drawer
				isOpen={Boolean(selectedCourse)}
				onClose={() => setSelectedCourse(null)}
				title={selectedCourse?.titre}
				titleId="course-drawer-title"
			>
				{selectedCourse && selectedColorClasses ? (
					<div className="space-y-6">
						<div>
							{selectedCourse.sousTitre ? (
								<p
									className={`text-base font-bold uppercase italic ${selectedColorClasses.text}`}
								>
									{selectedCourse.sousTitre}
								</p>
							) : null}
							<p className="mt-4 whitespace-pre-line text-base leading-relaxed text-gray-700">
								{selectedCourse.description}
							</p>
						</div>

						<div className="space-y-3 text-sm text-gray-700">
							<div className="flex items-center gap-2">
								<FaClock className="h-4 w-4 shrink-0 text-primary" aria-hidden />
								<span>
									{formatTimeRange(selectedCourse.heureDebut, selectedCourse.heureFin)}
								</span>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<FaMapMarkerAlt className="h-4 w-4 shrink-0 text-primary" aria-hidden />
									<span className="font-semibold text-darkgray">{selectedCourse.room.nom}</span>
								</div>
								<p className="mt-2 whitespace-pre-line pl-6 text-gray-600">
									{selectedCourse.room.adresse}
								</p>
							</div>
						</div>

						{selectedCourse.room.mapsUrl ? (
							<Button
								label="Voir sur Google Maps"
								href={selectedCourse.room.mapsUrl}
								variant="primary"
								icon={<FaMapMarkerAlt className="h-4 w-4 shrink-0" aria-hidden />}
								className="w-full justify-center"
							/>
						) : null}

						{coursesCta || registrationCta ? (
							<div className="flex flex-col gap-3 border-t border-gray-200 pt-6">
								{coursesCta ? (
									<Button
										label={coursesCta.label}
										href={coursesCta.href}
										variant="primary"
										icon={<FaBook className="h-4 w-4 shrink-0" aria-hidden />}
										className="w-full justify-center"
									/>
								) : null}
								{registrationCta ? (
									<Button
										label={registrationCta.label}
										href={registrationCta.href}
										variant="outline"
										icon={<FaUserFriends className="h-4 w-4 shrink-0" aria-hidden />}
										className="w-full justify-center"
									/>
								) : null}
							</div>
						) : null}
					</div>
				) : null}
			</Drawer>
		</>
	)
}
