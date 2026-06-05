interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className="max-w-5xl mx-auto px-4 py-6 w-full">
      {children}
    </main>
  )
}
