import { LiveEditor } from './editor'

export default async function Page(props) {
  const searchParams = await props.searchParams

  return (
    <div>
      <LiveEditor searchParams={searchParams} />
    </div>
  )
}
