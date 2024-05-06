// reducers/headerReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchHeaderText } from "../action/authAction";

const initialState = {
  loading: false,
  headerText: {
    Telephone_text: "",
    account_creation_text: "",
    create_account_text: "",
    create_account_text_2: " ",
    create_an_account_text: "",
    forgot_password: "",
    forgot_password_text: " ",
    forgot_password_verification_text: "",
    // "get_started_text": "Get Started",
    guest_login_text: " ",
    login_into_your_account_text:"",
    login_text:"",
    profile_text: "",
    profile_description_text:"",
    continue_text: "",
    reset_your_password_text: "",
    verify_account_text: "",
    enter_below_code_text: "",
    resent_otp_text_in : "",
    resend_otp_text: " ",
    enter_verification_code_text: "",
    exist_test: "",
    otp_sent_text: "",
    one_special_character_and_at_least_8_characters_text:"",
    one_uppercase_letter_1_lowercase_letter_text: "",
    password_must_contain_1_number_text: "",
    username_text: "",
    set_password_text:"",
    reset_password_text:"",
    congratulations_text:"",
    login_here_text:"",
    address_text:"",
    telephone_text:"",
    email_text:"",
    chat_with_us_text:"",
    view_my_profile_text: "",
    search_for_event_media_text:"",
    view_purchased_media_text:"",
    contact_uep_text:"",
    place_pre_order_for_upcoming_event_text:"",
    loding_text: "",
    },
  error: null as string | null,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeaderText.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error on pending
      })
      .addCase(fetchHeaderText.fulfilled, (state, action) => {
        state.loading = false;
        state.headerText = action.payload;
        state.error = null;
      })
      .addCase(fetchHeaderText.rejected, (state, action) => {
        state.loading = false;
        state.headerText = "";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export default headerSlice.reducer;
