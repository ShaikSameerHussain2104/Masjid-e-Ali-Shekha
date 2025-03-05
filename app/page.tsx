import FinanceManager from "@/components/finance-manager"
import ErrorBoundary from "@/components/error-boundary"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">Masjid Finance Manager</h1>
        <ErrorBoundary>
          <FinanceManager />
        </ErrorBoundary>
      </div>
    </main>
  )
}

