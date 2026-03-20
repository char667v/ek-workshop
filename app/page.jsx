import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Design Systems Workshop
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn to build consistent, accessible, and reusable UI components
            </p>
          </div>

          {/* Demo Card */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Welcome to the Workshop</CardTitle>
              <CardDescription>
                This starter includes pre-built Button and Card components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Explore the existing components, then complete the workshop
                tasks to build your own Alert, Dialog, and Form components.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                {/* TODO: Uncomment these after adding variants in button.jsx */}
                {/* <Button variant="secondary">Secondary</Button> */}
                {/* <Button variant="success">Success</Button> */}
                {/* <Button variant="danger">Danger</Button> */}
                {/* <Button variant="outline">Outline</Button> */}
                {/* <Button variant="ghost">Ghost</Button> */}
                {/* <Button variant="link">Link</Button> */}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                All components follow design system principles
              </p>
            </CardFooter>
          </Card>

          {/* Task Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Your Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">1.</span>
                    <span>
                      Add Button variants: secondary, success, danger, outline,
                      ghost, link
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">2.</span>
                    <span>
                      Build a Dialog component using Radix UI primitives
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">3.</span>
                    <span>
                      Create an Alert component with CVA variants and
                      subcomponents
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">4.</span>
                    <span>
                      Build a Form Dialog combining Dialog + form validation
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Key Concepts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-success font-medium">✓</span>
                    <span>Consistent design tokens (colors, spacing)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success font-medium">✓</span>
                    <span>Component variants with CVA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success font-medium">✓</span>
                    <span>Accessibility-first with Radix primitives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success font-medium">✓</span>
                    <span>Composable component architecture</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl">Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                <strong>1. Explore the code:</strong> Check out{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  components/ui/button.jsx
                </code>{" "}
                and{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  components/ui/card.jsx
                </code>{" "}
                to see the patterns
              </p>
              <p className="text-sm">
                <strong>2. Read the stubs:</strong> Open the task files in{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  components/ui/
                </code>{" "}
                for hints and imports
              </p>
              <p className="text-sm">
                <strong>3. Build your components:</strong> Follow the patterns
                from Button (CVA variants) and Card (composable subcomponents)
              </p>
              <p className="text-sm">
                <strong>4. Test in the browser:</strong> Add your components to
                this page and verify they work
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
