
const types =[
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
]


const make = (variant, idx) => (
  <Alert key={idx} variant={variant}>
    This is a {variant} alert—check it out!
  </Alert>
)

const alerts = () => {
  let block = types.map(make)


  return (
    <div>
      {block}
    </div>
  );
}


