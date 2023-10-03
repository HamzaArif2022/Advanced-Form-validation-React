
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object({
    name: yup.string().required(),
    password: yup.string().required().test("value", "invalid password", (value) => {
        return value === '12345678'
    }),
    email: yup.string().email().required(),
    age: yup.number().required().min(18).max(50)


})

const Form = () => {
    const { register, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),

        defaultValues: async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
            const data = await response.json()
            return {
                name: data.name,
                age: 30,
                country: "DZ",
                email: data.email
            }
        }
    })

    const { errors, isSubmitted, isValid, isDirty, dirtyFields, submitCount } = formState
    /*   errors, :object of errors input with thier names
      isSubmitted,: if user submit the form 
       isValid,:is all the feiled match the requirement of yup 
       isDirty: is update the intiale value
       dirtyFields:return object of all the feiled that has changed  before the submition
       submitCount :numbre of submitting the form (to many request)
        */
    const FormSubmit = (data) => {
        console.log(data);
        // alert(JSON.stringify(data));
    }
    return (
        <div>


            {submitCount > 3 ? <alert className="alert alert-danger  " >Too Many Request !! you have Been Blocked!!</alert> : (


                <>
                    {isSubmitted &&

                        <alert className="alert alert-success  " >submitted !!</alert>
                    }
                    <h2 className='display-6 text-primary'>Update user</h2>
                    <hr className='text-primary' />
                    <form onSubmit={handleSubmit(FormSubmit)} >
                        <div className="form-group">
                            <label>Full name</label>
                            <input className='form-control' type="text" {...register("name", {

                                /*   minLength: 12,
                                  required: true */

                            })} />
                            {errors.name && <span className='text-danger'>{errors.name.message}</span>}

                        </div>

                        <div className="form-group">
                            <label>Age</label>
                            <input className='form-control' type="text"   {...register("age", {
                                /*  min: {
                                     value: 18,
                                     message: "minmum age 18"
                                 },
                                 max: {
         
                                     value: 50,
                                     message: "maximum age 50"
                                 },
                                 required: {
         
                                     value: true,
                                     message: "this feiled is required"
                                    } */
                            })} />
                            {errors.age && <span className='text-danger'>{errors.age.message}</span>}

                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input className='form-control' type="password"   {...register("password", {
                                /*  required: {
                                     value: true,
                                     message: "this feiled is required"
                                 } */
                            })} />
                            {errors.password && <span className='text-danger'>{errors.password.message}</span>}

                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input className='form-control' type="email"  {...register("email", {
                                // pattern: /^\s+@\s+\.\s+$/
                            })} />
                        </div>
                        {errors.email && <span className='text-danger'>{errors.email.message}</span>}


                        <div className="form-group">
                            <label>Country</label>
                            <select className='form-select'   {...register("country")}>
                                <option value="">Select your country</option>
                                <option value="MA">Morocco</option>
                                <option value="DZ">Algeria</option>
                                <option value="TN">Tunisia</option>
                            </select>
                        </div>

                        <div className="my-3">
                            <input disabled={!isValid || Object.keys(dirtyFields).length === 0} className='btn btn-primary' type="submit" value='Submit' />
                        </div>
                    </form>
                    {/* <DevTool control={control}/> */}


                </>
            )

            }
        </div>
    );
}
export default Form