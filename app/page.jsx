import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { FormDialog } from "@/components/ui/form-dialog"
import { Badge } from "@/components/ui/badge"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

{/* ******************************* */}
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* ******************************* */}
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Design Systems Workshop CKKKK KKK
            </h1>
            <p className="text-lg text-muted-foreground">
              Build reusable UI components using design system patterns
            </p>
          </div>
          {/* ******************************* */}
          {/* Demo Card */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Welcome to the Workshop</CardTitle>
              <CardDescription>
                You are starting from two reference components: Button and Card
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Complete the tasks in order to build your own Button variants,
                Dialog, Alert, and Form Dialog.
              </p>

              {/* ******************************* */}
              <div className="flex flex-wrap gap-3">
                {/* TODO: Uncomment these after adding variants in button.jsx */}
                {/* <Button variant="secondary">Secondary</Button> */}
                {/* <Button variant="success">Success</Button> */}
                {/* <Button variant="danger">Danger</Button> */}
                {/* <Button variant="outline">Outline</Button> */}
                {/* <Button variant="ghost">Ghost</Button> */}
                {/* <Button variant="link">Link</Button> */}

                <Button variant="default" size="default">Default</Button>
                <Button variant="default" size="sm">Default SM</Button>
                <Button variant="default" size="lg">Default LG</Button>

                <Button variant="secondary" size="default">Default</Button>
                <Button variant="secondary" size="sm">Secondary SM</Button>
                <Button variant="secondary" size="lg">Secondary LG</Button>

                <Button variant="success" size="default">Default</Button>
                <Button variant="success" size="sm">Success SM</Button>
                <Button variant="success" size="lg">Success LG</Button>
                
                <Button variant="danger" size="lg">Danger LG</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </CardContent>

            {/* ******************************* */}
            <div className="space-y-4 p-6"> {/* Dialog component */}
              <Dialog>
                <DialogTrigger asChild>
                <Button>Open Dialog</Button>
                </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                    <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
              </Dialog>
            </div>{/* Dialog component end*/}

            {/* ******************************* */}
            {/* task 3 */}
            <div className="space-y-4 p-6">
              <Alert variant="default">
                <AlertTitle>Default</AlertTitle>
                <AlertDescription>This is a default alert.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>Your changes have been saved.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>This action cannot be undone.</AlertDescription>
              </Alert>
            </div>
            {/* task 3 end */}

            {/* ******************************* */}
            {/* task 4 start */}
            <div className="space-y-4 p-6">
              <FormDialog>
                <DialogTrigger asChild>
                 <Button>Contact Us</Button>
                </DialogTrigger>
              </FormDialog>
            </div>
            {/* task 4 end */}

            {/* ************* Badge ****************** */}
            <div className="flex flex-wrap gap-2 p-6">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">For Sale</Badge>
              <Badge variant="destructive">Sold Out</Badge>
              <Badge variant="default">New</Badge>
              <Badge variant="outline">Coming Soon</Badge> 
            </div>

            {/* ************* Tooltip ****************** */}
            <div className="flex flex-wrap gap-2 p-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                  <p>This is a tooltip!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* ************* Accordion ****************** */}
            <div className="flex flex-wrap gap-2 p-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is a design system?</AccordionTrigger>
                  <AccordionContent>A set of reusable components guided by clear standards.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What is CVA?</AccordionTrigger>
                  <AccordionContent>Class Variance Authority — a tool for managing component variants.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What is Radix UI?</AccordionTrigger>
                  <AccordionContent>Accessible, unstyled UI primitives for React.</AccordionContent>
                </AccordionItem>
                </Accordion>
            </div>

            
            {/* ************* Avatar ****************** */}
<div className="flex gap-4 p-6">
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>

  <Avatar>
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>

  <Avatar className="h-16 w-16">
    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>

  <Avatar className="h-16 w-16">
    <AvatarImage src="https://github.com/char667v.png" alt="User" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>

  <Avatar className="h-16 w-16">
    <AvatarImage src="/your-image.jpg" alt="User" /> {/*replace with your own image*/}
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</div>



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
                <CardDescription>Build these in order, then demo each in this page</CardDescription>
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
                <strong>3. Build task-by-task:</strong> Use Button for CVA
                patterns and Card for subcomponent patterns
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
