 <div>
      <form onSubmit={handleSubmit} className='bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-10'>
        <h2>Register</h2>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Name
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            type='text'
            placeholder='Enter your name'
            name='name'
            value={formdata.name}
            onChange={handleInputChange}
            id='name'
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email
          </label>

          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            placeholder='Enter your email'
            name='email'
            value={formdata.email}
            onChange={handleInputChange}
            id='email'
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>

          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='Enter your password'
            name='password'
            value={formdata.password}
            onChange={handleInputChange}
            id='password'
          />


          <div className=' w-full flex items-center justify-between mt-4 '>
            <button type='submit' className= 'w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Register
            </button>
           
          </div>
          {/* have account */}
          <div>
           <Link to="/login">Login</Link>
           
          </div>

          
        </div>
      </form>
    </div>