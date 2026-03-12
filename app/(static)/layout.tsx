import Header from "@/components/static-header"
import Footer from "@/components/footer"

export default function StaticLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    )
  }