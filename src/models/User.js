import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
          },
          resetPasswordToken: String,
          resetPasswordExpire: Date,
        
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, 
    }
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Skip if the password is not modified
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
  };

const User = model('User', UserSchema);

export default User;