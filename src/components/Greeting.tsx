interface GreetingProps {
  name: string
}

export function Greeting({ name }: GreetingProps) {
  return <h1>Bonjour {name}</h1>
}
