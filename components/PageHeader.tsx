interface PageHeaderProps {
	title: string
	subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
	return (
		<header className="page-header relative overflow-hidden pb-20 pt-14 text-white sm:pb-28 sm:pt-16 md:pb-32 md:pt-20">
			<div className="page-header-bg pointer-events-none absolute inset-0" aria-hidden="true" />
			<div className="page-header-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
			<div className="page-header-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
			<div className="page-header-glow pointer-events-none absolute inset-0" aria-hidden="true" />

			<div className="container relative z-10 mx-auto flex min-h-[12rem] flex-col justify-center px-8 sm:min-h-[14rem] md:min-h-[14rem]">
				<div className="mb-0 flex items-center gap-4">
					<span className="font-page-header-title shrink-0 text-md font-semibold uppercase tracking-widest text-primary">
						RG FIGHT CLUB
					</span>
					<div className="h-px w-24 bg-primary" aria-hidden="true" />
				</div>

				<div className="relative">
					<span className="page-header-watermark font-page-header-title" aria-hidden="true">
						{title}
					</span>
					<h1 className="relative z-10 font-page-header-title text-5xl uppercase tracking-tight text-white sm:text-6xl md:text-8xl lg:text-11xl">
						{title}
					</h1>
				</div>

				<div className="mt-4 h-1 w-14 bg-primary sm:mt-5" aria-hidden="true" />

				{subtitle ? (
					<p className="mt-5 max-w-3xl text-base font-normal text-white/90 sm:mt-6 sm:text-lg">
						{subtitle}
					</p>
				) : null}
			</div>
		</header>
	)
}
