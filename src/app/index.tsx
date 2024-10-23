import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/Card"
import { Text } from "react-native"

export default function Index() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accelerate UI</CardTitle>
        <CardDescription>Enter a new development experience</CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-base text-primary">
          Sleek, easy to use components to build your next app faster.
        </Text>
      </CardContent>
      <CardFooter>
        <Text className="text-sm text-muted-foreground">
          Inspired by shadcn/ui
        </Text>
      </CardFooter>
    </Card>

  )
}
