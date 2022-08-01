import $ from "jquery";
import './sendmail.php'

function Submiting() {

  $('form').on('submit', function(e) {
    e.preventDefault()
    let form = $(this)
    let mess = $('.mess')
    // let btn = th.find('.btn')

    $.ajax({
      url: './sendmail.php',
      method: 'POST',
      data: form.serialize(),
      success: function(data) {
        console.log(data)
        mess.html('<span>Сообщение отправлено</span>')
        form.reset()
      },
      error: function() {
        mess.html('<span>Сообщение не отправлено</span>')
      }
    })
  })
}

export default Submiting