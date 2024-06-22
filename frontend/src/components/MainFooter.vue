<template>
  <footer class="main-footer">
    <div class="top-section">
      <div>
        <div class="top-section-title">About</div>
        <a href="">Contact Us</a>
        <a href="">About Us</a>
        <a href="">Careers</a>
        <a href="">Allinonebazaar Stories</a>
        <a href="">Corporate Informantion</a>
      </div>
      <div>
        <div class="top-section-title">Group Companies</div>
        <a href="">Companies1</a>
        <a href="">Companies2</a>
        <a href="">Companies3</a>
      </div>
      <div>
        <div class="top-section-title">Help</div>
        <a href="">Payments</a>
        <a href="">Shipping</a>
        <a href="">Cancellation & Returns</a>
        <a href="">FAQ</a>
        <a href="">Report Infrigment</a>
      </div>
      <div>
        <div class="top-section-title">Consumer Policy</div>
        <a href="">Cancellation & Returns</a>
        <a href="">Terms Of Use</a>
        <a href="">Security</a>
        <a href="">Privacy</a>
      </div>
      <div class="company-contact-details">
        <div class="top-section-title">Mail Us:</div>
        <div>
          <p>Allinonebazaar Pvt Limited,</p>
          <p>Sector 12/F, Near BMP Camp, B.S.City</p>
          <p>827012, Jharkhand, India</p>
        </div>
      </div>
      <div>
        <div class="top-section-title">Registered Office Address</div>
        <div>
          <p>Allinonebazaar Pvt Limited,</p>
          <p>Sector 12/F, Near BMP Camp, B.S.City</p>
          <p>827012, Jharkhand, India</p>
          <p>
            Telephone:
            <a style="display: inline" href="tel:+916201967433"
              >+91 6201967433</a
            >
          </p>
        </div>
      </div>
    </div>
    <div class="bottom-section"><p>&copy; 2024-2024 allinonebazaar.com</p></div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.main-footer {
  background-color: rgb(20 20 20 / 95%);
  text-align: left;

  .top-section {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding: 40px 60px 0;
    column-gap: 20px;

    .top-section-title {
      color: #878787;
      font-size: 12px;
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    a {
      font-size: 12px;
      color: #fff;
      display: block;
      line-height: 18px;
    }

    .company-contact-details {
      border-left: 1px solid #454d5e;
      padding-left: 32px;
    }

    p {
      white-space: nowrap;
      color: #fff;
      font-size: 12px;
      line-height: 18px;
    }
  }

  .bottom-section {
    border-top: 1px solid #454d5e;
    padding: 25px 0;
    margin-top: 40px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    p {
      white-space: nowrap;
      color: #fff;
      font-size: 12px;
      line-height: 18px;
    }
  }
}
</style>
