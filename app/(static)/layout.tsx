import Header from "@/components/static-header"

export default function StaticLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <Header />
        {children}
      </>
    )
  }