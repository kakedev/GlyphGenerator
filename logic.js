$(function() {
  $('#createBtn').click(createNewGlyph);
  createNewGlyph();
});

function createNewGlyph() {
  let rand = randomInt(0, 999999);
  $('#gridArea').prepend(
    $('<div>').addClass('row').attr('id', 'glyph-' + rand).append(
      $('<div>').addClass('col-md-12 col-lg-12').append(
        $('<div>').addClass('panel panel-default').append(
          $('<div>').addClass('panel-heading').append(
            $('<strong>').attr('id', 'glyphHeading-' + rand).html('New Glyph')
          ).append(
            $('<button>').addClass('close').attr('id', 'btnClose-'+rand).html('&times;')
          ).append(
            $('<br>')
          )
        ).append(
          $('<div>').addClass('panel-body').append(
            $('<div>').addClass('col-md-3 col-lg-3').append(
              $('<div>').addClass('panel panel-primary grid-container glyph-panel').append(
                $('<div>').addClass('panel-heading').html('Pixels')
              ).append(
                $('<div>').addClass('panel-body').attr('id', 'grid-'+rand)
              )
            )
          ).append(
            $('<div>').addClass('col-md-4 col-lg-4').append(
              $('<div>').addClass('panel panel-primary glyph-panel').append(
                $('<div>').addClass('panel-heading').html('Configuration')
              ).append(
                $('<div>').addClass('panel-body').append(
                  $('<div>').addClass('form-group').append(
                    $('<label>').attr('for', 'glyphName' + rand).html('Glyph Name:')
                  ).append(
                    $('<input>').addClass('form-control').attr('type', 'text').attr('id', 'glyphName-' + rand).attr('maxlength', '140')
                  )
                ).append(
                  $('<div>').addClass('btn-group config-group').append(
                    $('<button>').addClass('btn btn-md btn-danger').html('Clear Pixel Grid').attr('id', 'btnClear-' + rand)
                  ).append(
                    $('<button>').addClass('btn btn-md btn-info').html('Invert Pixel Grid').attr('id', 'btnInvert-' + rand)
                )
              )
            )
          )
        ).append(
          $('<div>').addClass('col-md-offset-1 col-lg-offset-1 col-md-4 col-lg-4').append(
            $('<div>').addClass('panel panel-primary glyph-panel').append(
              $('<div>').addClass('panel-heading').html('Output')
            ).append(
              $('<div>').addClass('panel-body').append(
                $('<pre>').attr('id', 'output-' + rand)
              )
            )
          )
        )
      )
    )
  )
);

  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 5; j++) {
      $('#grid-' + rand).append(
        $('<canvas>').addClass('pixel off').attr('id', 'pixel-' + rand + '-' + (j + i * 5)).click(function() {
          $(this).toggleClass('on off');
          generateOutput(rand);
        })
      ).append(' ');
    }
    $('#grid-' + rand).append($('<br>'));
  }

  $('#btnInvert-' + rand).click(function() {
    $('[id^=pixel-' + rand + '-]').toggleClass('on off');
    generateOutput(rand);
  });

  $('#btnClear-' + rand).click(function() {
    $('[id^=pixel-' + rand + '-]').removeClass('on').addClass('off');
    generateOutput(rand);
  });

  $('#glyphName-' + rand).keyup(function() {
    generateOutput(rand);

    let name = $('#glyphName-' + rand).val();
    if(name.trim() === '')
      $('#glyphHeading-' + rand).html('New Glyph');
    else
      $('#glyphHeading-' + rand).html(name);
  });

  $('#btnClose-' + rand).click(function() {
    $('#glyph-' + rand).remove();
  });

  $('#grid-' + rand).mousedown(function() {
    return false;
  });

  generateOutput(rand);

}

function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function generateOutput(id) {
  let outputStr = 'byte ';
  let name = $('#glyphName-' + id).val();

  if(name.trim() === '')
    outputStr += 'name';
  else
    outputStr += name;

  outputStr += '[8] = {\n\t';

  for(let y = 0; y < 8; y++){
    let currentByte = '0b';
    for(let x = 0; x < 5; x++) {
      if($('#pixel-'+id+'-'+(x+y*5)).is('.on') == true)
        currentByte += '1';
      else
        currentByte += '0';
    }

    outputStr += currentByte;
    if(y !== 7)
      outputStr += ',\n\t';
    else
      outputStr += '\n';
  }

  outputStr += '};';
  $('#output-' + id).html(outputStr);
}
