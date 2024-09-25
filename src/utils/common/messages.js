export const generalMessage =(entity)=>({
    CreatedSuccessfully:`${entity} created successfully`,
    UpdatedSuccessfully:`${entity} updated successfully`,
    DeletedSuccessfully:`${entity} deleted successfully`,
    CreatedFailed:`Failed to create ${entity}`,
    UpdatedFailed:`Failed to update ${entity}`,
    DeletedFailed:`Failed to delete ${entity}`,
    NotFound:`${entity} not found`,
    AlreadyExists:`${entity} already exists`,
    Success:`Success `,
    Invalid:`Invalid `,
    Apply:`Applied successfully `,
    Added:`item Added successfully`,
    stock:`item quantity is greater than available`

})

export const messages={
    User:{...generalMessage("user"),
        userSignedInSuccessfully:"User signed in",
        accountVerifiedSuccessfully:"Account verified successfully",
        mustLogin:"User must login",
        userNotAuthorized:"User is not authorized"
    },
    password:{...generalMessage("password"),
        passwordsNotMatch:"rePassword does not match",
        emailOrPasswordIncorrect:"email or password is incorrect",
    },
    token:{
        ...generalMessage("token"),
        invalidToken:"invalidToken",
        required:"token is required",
        invalidBearerKey:"invalidBearerKey",
        invalidPayload:"invalidPayload",
        },
    email:{...generalMessage("email"),
        emailNotExists:"Email not exists",
        emailNotVerified:"Email not verified",
        accountsFound:"Accounts found"
    },
    otp:{
        ...generalMessage("otp"),
    invalidOtp:"invalid Otp",
    otpExpired:"otp expired",
        },
    Category:{...generalMessage("category"),},
    Brand:{...generalMessage("brand"),},
    SubCategory:{...generalMessage("subCategory"),},
    Product:{...generalMessage("product"),},
    Review:{...generalMessage("review"),},
    Coupon:{...generalMessage("coupon"),},
    cart:{...generalMessage("cart"),},
    Wishlist:{...generalMessage("Wishlist"),},
    Address:{...generalMessage("address"),},
    order:{...generalMessage("order"),},
    Success:{Success:`Success `},
}