Ext.define('LOP.ExtCmmButton', {
	Button : function(text, listeners) {
		return {
			xtype : 'button',
			text : text,
			listeners : listeners == null ? null : listeners
		};
	},
	Save : function( listeners)	{
		return this.Button("저장",listeners);
	},
	Reg : function(listeners)	{
		return this.Button("등록",listeners);
	},
	Edit : function(listeners)	{
		return this.Button("수정",listeners);
	},
	Del : function(listeners)	{
		return this.Button("삭제",listeners);
	},
	Cancel : function(listeners)	{
		return this.Button("취소",listeners);
	},
	TempSave : function(listeners)	{
		return this.Button("임시저장",listeners);
	},
	Approval : function(listeners)	{
		return this.Button("승인",listeners);
	},
	Return : function(listeners)	{
		return this.Button("반려",listeners);
	},
	Add : function(listeners)	{
		return this.Button("추가",listeners);
	},
	Search : function(listeners)	{
		return this.Button("검색",listeners);
	},
	Complete : function(listeners)	{
		return this.Button("완료",listeners);
	},
	Request : function(listeners)	{
		return this.Button("결재요청",listeners);
	}
});